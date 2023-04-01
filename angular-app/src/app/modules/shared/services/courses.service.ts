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
        return this.http.get('./api/courses');
    }
    
    getFile() {
        return this.http.get('./api/upload/file');
    }

    getSingleCourse(courseId: string) {
        return this.http.get(`./api/single_course/${courseId}`);
    }

    postCourse(course: Course) {
        return this.http.post('./api/courses', course , {	observe: 'body' }).pipe(map((result: any) => result));
    }

    deleteSingleCourse(courseId: string) {
        return this.http.delete(`./api/single_course/${courseId}`).pipe(map((result: any) => result));
    }

    deleteAllActiveCourses() {
        return this.http.delete('./api/courses').pipe(map((result: any) => result));
    }

    deleteAllFinshiedCourses() {
        return this.http.delete('./api/finished_courses').pipe(map((result: any) => result));
    }

    updateCourse(course: CourseUpdate) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        return this.http.put('./api/courses', course, { headers }).pipe(map((result: any) => result));
    }
}