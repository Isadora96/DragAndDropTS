import { Component } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Course } from '../../shared/models/course.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent  {
    displayedColumns: string[] = ['select', 'title', 'description', 'people', 'status', 'created_at']; 
    courses: any = [];  
    selection = new SelectionModel<Course>(true, []);
    toggled: Boolean = false;
    
    constructor(private coursesService: CoursesService) { }


    ngOnInit() {
        this.loadResults();
    };

      /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.courses.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.courses);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Course) {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'}}`;
     }

    loadResults() {
        this.coursesService.getCourses().subscribe(data => {
            this.courses = data
        })
    }

    onClick($event: { stopPropagation: () => void; }) {
        $event.stopPropagation();
        this.toggled = true;
        const modal = document.querySelector('#modal');
        if(this.toggled) {
            modal?.setAttribute('class', 'display-block')
        } else {
            modal?.setAttribute('class', 'display-none')
        }

    }

    onClose(event: Event) {
        event.stopPropagation();
        this.toggled = false;
        const modal = document.querySelector('#modal');
        modal?.setAttribute('class', 'display-none')
        this.selection.clear();
    }
}
  