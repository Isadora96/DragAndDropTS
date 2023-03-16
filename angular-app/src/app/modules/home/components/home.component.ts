import { Component } from '@angular/core';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Course } from '../../shared/models/course.model';
import { Router } from '@angular/router';
import { AllCoursesComponent } from '../../allCourses/components/courses.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [AllCoursesComponent]
})

export class HomeComponent  {
    displayedColumns: string[] = ['select', 'title', 'description', 'people', 'status', 'created_at', 'author']; 
    courses: any = [];  
    activeCourses: object[] = [];
    finishedCourses: object[] = [];
    selection = new SelectionModel<Course>(true, []);
    toggled: boolean = false;
    setDisabled: boolean = false;
    
    constructor(private coursesService: CoursesService, private router: Router, private allCourses: AllCoursesComponent) { }


    ngOnInit() {
        this.loadResults();
    };

    checkStorage(id: string | Array<any>) {
        const favorites_id = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : []
        if(typeof(id) == 'string') {
            for(let fav_id of favorites_id!) {
                if(fav_id == id) {
                    favorites_id!.splice(favorites_id!.indexOf(id), 1);
                    localStorage.setItem('favorites', JSON.stringify(favorites_id));
                }
            }
        } else {
            const course_ids = id.map((course: { _id: { $oid: string; }; }) => course._id.$oid)
                for(let course_id of course_ids) {
                    let index = favorites_id!.indexOf(course_id)
                    if(index >= 0) {
                        favorites_id!.splice(favorites_id!.indexOf(course_id), 1);
                        localStorage.setItem('favorites', JSON.stringify(favorites_id));
                    }
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
            this.courses = this.allCourses.getImageData(data)
            this.activeCourses = this.courses.filter((ele: { status: string; }) => ele.status === 'active');
            this.finishedCourses = this.courses.filter((ele: { status: string; }) => ele.status === 'finished');
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

    deleteActives() {
        this.coursesService.deleteAllActiveCourses().
            subscribe(response => {
                this.checkStorage(this.activeCourses)
                window.alert(response)
                location.reload();
            },
            error => {
                window.alert('Something went wrong!')
                location.reload();
        })
    }

    deleteFinished() {
        this.coursesService.deleteAllFinshiedCourses().
            subscribe(response => {
                this.checkStorage(this.finishedCourses)
                window.alert(response)
                location.reload();
            },
            error => {
                window.alert('Something went wrong!')
                location.reload();
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
        const author = document.querySelector('#author')! as HTMLElement;
        const image = document.querySelector('#image')! as HTMLImageElement;

        title.textContent = rowId.title
        description.textContent = rowId.description
        people.textContent = 'Joined : ' + rowId.people
        status.textContent = 'Status: ' + rowId.status
        author.textContent = rowId.author
        image.src = rowId.image_binary ? rowId.image_binary : "https://media.istockphoto.com/id/1328208611/pt/vetorial/homework-assignment-concept-of-e-learning-online-education-home-schooling-web-courses.jpg?s=612x612&w=is&k=20&c=MBAhY0V2tQ_aw7lCYEk20dCtD8bAZ164wrRmEGl2mks="

        this.onDelete(rowId);
        this.onUpdate(rowId);

    }

    private onDelete(rowId: any) {
        const deleteBtn = document.querySelector('#delete-btn')! as HTMLButtonElement;
        deleteBtn.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this.coursesService.deleteSingleCourse(rowId._id.$oid).
            subscribe(response => {
                this.checkStorage(rowId._id.$oid);
                window.alert(response);
                location.reload();
            },
            error => {
                window.alert('Something went wrong!')
                location.reload();
            })
        });
    }

}
  