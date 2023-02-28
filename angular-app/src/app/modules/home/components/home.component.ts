import { Component, inject } from '@angular/core';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Course } from '../../shared/models/course.model';
import { Router } from '@angular/router';

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
    
    constructor(private coursesService: CoursesService, private router: Router) { }


    ngOnInit() {
        this.loadResults();
    };

    checkStorage(id: string) {
        const favorites_id = localStorage.getItem('favorites.courses') ? JSON.parse(localStorage.getItem('favorites.courses')!) : []
        for(let fav_id of favorites_id!) {
            if(fav_id.id == id) {
                favorites_id!.splice(favorites_id!.indexOf(id), 1);
                localStorage.setItem('favorites.courses', JSON.stringify(favorites_id));
            }
        }
    }

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
            if(this.courses.length < 1) this.setDisabled = true
        })
    }

    onClickOpenModal(event: Event, rowId: any) {
        event.stopPropagation();
        this.openModal('#modal');
        this.setContent(rowId);
    }

    onClickOpenModalAll(event: Event) {
        event.stopPropagation();
        this.openModal('#modalAll')
    }

    onCloseModal(event: Event) {
        event.stopPropagation();
        this.setCloseModalId('#modal');
    }

    onCloseModalAll(event: Event) {
        event.stopPropagation();
        this.setCloseModalId('#modalAll');
    }

    deleteAll() {
        this.coursesService.deleteAllCourses().
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

    }

    private onUpdate(rowId: any) {
        const updateBtn = document.querySelector('#update-btn')! as HTMLButtonElement;
        const currentRouteColor = document.querySelector('.current-route')! as HTMLAnchorElement;

        updateBtn.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this.router.navigate([`/createcourse/${rowId._id.$oid}`]);
            currentRouteColor.classList.remove('current-route');
        })
    }

    private openModal(id: string) {
        this.toggled = true;
        this.setDisabled = true;
        const modal = document.querySelector(id);
        modal?.setAttribute('class', 'display-block')
    }

    private setCloseModalId(id: string) {
        this.toggled = false;
        this.setDisabled = false;
        const modal = document.querySelector(id);
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
        this.onUpdate(rowId);

    }

    private onDelete(rowId: any) {
        const deleteBtn = document.querySelector('#delete-btn')! as HTMLButtonElement;
        deleteBtn.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this.coursesService.deleteCourse(rowId._id.$oid).
            subscribe(response => {
                this.checkStorage(rowId._id.$oid);
                window.alert(response);
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
  