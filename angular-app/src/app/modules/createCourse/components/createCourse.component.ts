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

    submitted = false;

    onSubmit() {
        this.submitted = true;
    }


  newCourse() {
    const course = new Course(this.title, this.description, this.people);
    this.coursesService.postCourse(course).subscribe(res => {
      console.log(res);
    })
  }
}
