import { Component, HostBinding, HostListener } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class AllCoursesComponent {

    courses: any = [];
    fav: boolean = false;

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {
        this.coursesService.getCourses().subscribe(data => {
            this.courses = data
        });
    }

    favorite($event: Event) {
        //$event.preventDefault();
        const favoriteIcons = document.querySelectorAll(".favorite-icon-course");
        favoriteIcons.forEach(favoriteIcon => {
            favoriteIcon.addEventListener('click', () => {
                favoriteIcon.classList.toggle('mat-icon-red')
            })
        })
    }


}