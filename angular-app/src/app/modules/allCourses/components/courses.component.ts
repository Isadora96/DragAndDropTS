import { Component, HostBinding, HostListener } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class AllCoursesComponent {

    courses: any = [];

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {
        this.coursesService.getCourses().subscribe(data => {
            this.courses = data
        });
    }

}