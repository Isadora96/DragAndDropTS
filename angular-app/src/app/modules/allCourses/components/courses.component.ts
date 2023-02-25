import { Component, EventEmitter, HostBinding, HostListener, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { FavoritesComponent } from '../../favorites/components/favorites.component';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class AllCoursesComponent implements OnInit {

    courses: any = [];
    favorites: any = [];

    constructor(private coursesService: CoursesService) {}

    ngOnInit() {
        this.coursesService.getCourses().subscribe(data => {
            this.courses = data
        });
    }

    favorite(event: any) {
        const course_id = event.target.id
        if(event.target.checked){
            this.favorites.push(course_id);
            this.saveFavoritesToStorage('favorites.courses');
        } else {
            this.unsaveFavorites(course_id);
            this.saveFavoritesToStorage('favorites.courses');
        }
    }

    saveFavoritesToStorage(key: string) {
        localStorage.setItem(key, this.favorites)
    }

    unsaveFavorites(_id: string){
        const favorite_id = localStorage.getItem('favorites.courses')?.split(',');
        this.favorites.splice(favorite_id?.indexOf(_id), 1);
    }

    isFavorite(course: any) {
        const favorites_id = localStorage.getItem('favorites.courses') ? localStorage.getItem('favorites.courses')?.split(',') : [];
        for (let i = 0; i < favorites_id!.length; i++) {
            if (favorites_id![i] === course._id.$oid) {
                return true;
            }
        }
        return false
    }
}