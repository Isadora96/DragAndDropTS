import { Component, HostBinding, HostListener } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { Course } from '../../shared/models/course.model';


@Component({
    selector: 'app-create-course',
    templateUrl: './createCourse.component.html',
    styleUrls: ['./createCourse.component.css']
})

export class CreateCourseComponent {

    title: string = '';
    description: string = '';
    people!: number;

    constructor(private coursesService: CoursesService) { }


  newCourse() {
    const course = new Course(this.title, this.description, this.people);
    this.coursesService.postCourse(course).subscribe(response => {
      window.alert(response)
      location.reload();
      console.log(response);
    })
  }
}
