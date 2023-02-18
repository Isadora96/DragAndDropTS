import { Component } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent  {
    displayedColumns: string[] = ['title', 'description', 'people', 'status', 'created_at']; 
    courses: any = [];
  
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    
    constructor(private coursesService: CoursesService) { }

    ngOnInit() {
        this.coursesService.getCourses().subscribe(data => {
            this.courses = data
        });
    }
}
  