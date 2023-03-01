import { Component, HostBinding, HostListener } from '@angular/core';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
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
    selectValue: any;

    constructor(private coursesService: CoursesService, private router: Router) { }

    ngOnInit() {
      if(this.router.url.includes('createcourse/')) {
        this.isUpdate = true;
        this.getSingleCourse();
      }
    }

  newCourse() {
    if(!this.title || !this.description || !this.people) {
      return
    }
    const course = new Course(this.title, this.description, this.people);
    const homeUrl = document.querySelector('#home');
    const current = document.querySelector('.current-route');
    this.coursesService.postCourse(course).subscribe(response => {
      window.alert(response);
      current?.classList.remove('current-route');
      homeUrl?.classList.add('current-route');
      this.router.navigate(['/']);
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
    const select = document.querySelector('#select') as HTMLSelectElement;
    const span = document.querySelector('#select-required') as HTMLSpanElement;
    const homeUrl = document.querySelector('#home');

    this.selectValue = select.textContent?.toLowerCase();

    if(!this.selectValue) {
      span.textContent = 'Make a selection';
      span.setAttribute('class', 'select-required');
      return
    }

    const course = new CourseUpdate(_id, title.value, description.value, Number(people.value), this.selectValue)
    this.coursesService.updateCourse(course).subscribe(response => {
      window.alert(response);
      this.router.navigate(['/']);
      homeUrl!.classList.add('current-route');
    },
    (error) => {
      window.alert(error.error.message);
    })

  }
}
