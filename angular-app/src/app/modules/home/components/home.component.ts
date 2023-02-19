import { Component, inject } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Course } from '../../shared/models/course.model';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

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
    setDisabled = false;
    
    constructor(private coursesService: CoursesService) { }


    ngOnInit() {
        this.loadResults();
    };

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.courses.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.courses);
    }

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

    onClick(event: Event, rowId: any) {
        event.stopPropagation();
        this.toggled = true;
        this.setDisabled = true;
        const modal = document.querySelector('#modal');
        modal?.setAttribute('class', 'display-block')
        this.setContent(rowId)
    }

    onClose(event: Event) {
        event.stopPropagation();
        //this.currentCourse.splice(0);
        this.toggled = false;
        this.setDisabled = false;
        const modal = document.querySelector('#modal');
        modal?.setAttribute('class', 'display-none');
        this.selection.clear();
    }

    private setContent(rowId: any) {
        const title = document.querySelector('#title')! as HTMLElement;
        const description = document.querySelector('#description')! as HTMLParagraphElement;
        const people = document.querySelector('#people')! as HTMLParagraphElement;
        const status = document.querySelector('#status')! as HTMLParagraphElement;

        title.textContent = rowId.title
        description.textContent = rowId.description
        people.textContent = 'Joined : ' + rowId.people
        status.textContent = 'Status: ' + rowId.status

        this.onDelete(rowId);

    }

    onDelete(rowId: any) {
        const deleteBtn = document.querySelector('#delete-btn')! as HTMLButtonElement;
        deleteBtn.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this.coursesService.deleteCourse(rowId._id.$oid).
            subscribe(response => {
                window.alert(response)
                location.reload();
                console.log(response);
            },
            error => {
                window.alert('Something went wrong!')
                location.reload();
                console.log(error);
            })
        });
    }
}
  