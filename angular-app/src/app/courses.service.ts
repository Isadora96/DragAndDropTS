import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class CoursesService {

    coursesUrl: string = 'http://localhost:5000/active_project';

    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get(this.coursesUrl);
    }
}