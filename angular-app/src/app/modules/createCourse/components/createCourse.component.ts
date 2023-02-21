import { Component, HostBinding, HostListener } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course, CourseUpdate } from '../../shared/models/course.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-course',
    templateUrl: './createCourse.component.html',
    styleUrls: ['./createCourse.component.css']
})

export class CreateCourseComponent {

    title: string = '';
    description: string = '';
    people!: number;
    course: any = [];
    isUpdate: Boolean = false;

    constructor(private coursesService: CoursesService, private router: Router) { }

    ngOnInit() {
      if(this.router.url.includes('createcourse/')) {
        this.isUpdate = true;
        this.getSingleCourse();
      }
    }

  newCourse() {
    const course = new Course(this.title, this.description, this.people);
    this.coursesService.postCourse(course).subscribe(response => {
      window.alert(response)
      location.reload();
      console.log(response);
    },
    error => {
      window.alert(error.error.message);
    })
  }

  getSingleCourse(){
    const _id = this.router.url.split('/')[2]
    this.coursesService.getSingleCourse(_id).subscribe(response => {
      this.course = response
    })
  }

  doUpdate(event: Event) {
    event.stopPropagation();
    const _id = this.router.url.split('/')[2]
    const title = document.querySelector('#title-update') as HTMLInputElement;
    const description = document.querySelector('#description-update') as HTMLInputElement;
    const people = document.querySelector('#people-update') as HTMLInputElement;
    //const course = new CourseUpdate(_id, title, description, people)
    //this.coursesService.updateCourse()
  }
}
