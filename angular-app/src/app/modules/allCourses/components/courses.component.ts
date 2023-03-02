import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { FavoritesService } from '../../shared/services/favorites.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class AllCoursesComponent implements OnInit {

    courses: any = [];
    favorites: any = [];

    constructor(private coursesService: CoursesService, private favoritesService: FavoritesService) {}

    ngOnInit() {
        this.favorites = localStorage.getItem('favorites.courses') ? JSON.parse(localStorage.getItem('favorites.courses')!) : []
        this.coursesService.getCourses().subscribe(data => {
            this.courses = data
        });
    }

    favorite(event: any) {
        const course_id = event.target.id
        if(event.target.checked){
            this.favorites.push({id: course_id});
            this.saveFavoritesToStorage('favorites.courses');
            this.favoritesService.setData(this.favorites);
        } else {
            this.unsaveFavorites(course_id);
            this.saveFavoritesToStorage('favorites.courses');
            this.favoritesService.setData(this.favorites);
        }
    }

    saveFavoritesToStorage(key: string) {
        localStorage.setItem(key, JSON.stringify(this.favorites))
    }

    unsaveFavorites(_id: string){
        const favorite_id = JSON.parse(localStorage.getItem('favorites.courses')!);
        this.favorites.splice(favorite_id?.indexOf(_id), 1);
    }

    isFavorite(id: any) {
        return this.favorites!.some((ele: { id: any; }) => ele.id === id);
    }

}