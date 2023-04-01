import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course, CourseUpdate } from "../models/course.model";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})

export class CoursesService {

    constructor(private http: HttpClient) {}

    getCourses() {
        return this.http.get('./api/v1/courses');
    }
    
    getFile() {
        return this.http.get('./api/v1/upload/file');
    }

    getSingleCourse(courseId: string) {
        return this.http.get(`./api/v1/single_course/${courseId}`);
    }

    postCourse(course: Course) {
        return this.http.post('./api/v1//courses', course , {	observe: 'body' }).pipe(map((result: any) => result));
    }

    deleteSingleCourse(courseId: string) {
        return this.http.delete(`./api/v1/single_course/${courseId}`).pipe(map((result: any) => result));
    }

    deleteAllActiveCourses() {
        return this.http.delete('./api/v1/courses').pipe(map((result: any) => result));
    }

    deleteAllFinshiedCourses() {
        return this.http.delete('./api/v1/finished_courses').pipe(map((result: any) => result));
    }

    updateCourse(course: CourseUpdate) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        return this.http.put('./api/v1/courses', course, { headers }).pipe(map((result: any) => result));
    }
}