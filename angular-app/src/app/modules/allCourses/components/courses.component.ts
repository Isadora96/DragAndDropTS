import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
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

    constructor(private coursesService: CoursesService, private favoritesService: FavoritesService, private elementRef: ElementRef) {}
    
    ngAfterViewChecked(): void {
        this.setAvatarImage()
    }

    setAvatarImage() {
        const avatar = this.elementRef.nativeElement.querySelectorAll('.avatar');

        const authors = this.courses.map((course: { author: any; }) => course.author[0]);

        avatar.forEach((element: { style: { backgroundImage: string; }; }, index: number) => {
            const letters = authors[index].split(' ')[0][0] + authors[index].split(' ')[1][0]
            const canvas = document.createElement('canvas') as HTMLCanvasElement;

            canvas.height = 200;
            canvas.width = 200;
    
            const ctx = canvas.getContext('2d')!;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#D3D3D3';
            ctx.font = 'bold 7rem sans-serif';
            ctx.textAlign="center";
            ctx.textBaseline="middle";


            ctx.fillText(letters.toUpperCase(), 100, 110); 
            const backgroundImageUrl = canvas.toDataURL();
            element.style.backgroundImage = `url(${backgroundImageUrl})`;
        })
    }

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