import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Course } from "./modules/shared/models/course.model";
// import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class CoursesService {

    coursesUrl: string = 'http://localhost:5000/active_project';

    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get(this.coursesUrl);
    }

    postCourse(course: Course) {
        return this.http.post(this.coursesUrl, course , {	observe: 'body' }).pipe(map((result: any) => result));
    }
}