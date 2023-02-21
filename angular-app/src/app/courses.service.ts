import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Course, CourseUpdate } from "./modules/shared/models/course.model";
// import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class CoursesService {

    coursesUrl: string = 'http://localhost:5000';

    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get(`${this.coursesUrl}/active_project`);
    }

    getSingleCourse(courseId: string) {
        return this.http.get(`${this.coursesUrl}/single_active_project/${courseId}`);
    }

    postCourse(course: Course) {
        return this.http.post(`${this.coursesUrl}/active_project`, course , {	observe: 'body' }).pipe(map((result: any) => result));
    }

    deleteCourse(courseId: string) {
        return this.http.delete(`${this.coursesUrl}/single_active_project/${courseId}`).pipe(map((result: any) => result));
    }

    deleteAllCourses() {
        return this.http.delete(`${this.coursesUrl}/active_project`).pipe(map((result: any) => result));
    }

    updateCourse(course: CourseUpdate) {
        return this.http.put(`${this.coursesUrl}/active_project`, course).pipe(map((result: any) => result));
    }
}