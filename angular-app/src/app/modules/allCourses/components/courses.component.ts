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
    favorite_storage: string[] = [];

    constructor(
        private coursesService: CoursesService, 
        private favoritesService: FavoritesService, 
        private elementRef: ElementRef
    ){}
    
    ngAfterViewChecked(): void {
        this.setAvatarImage();
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
        this.favorite_storage = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : []
        this.favoritesService.getFavorites().subscribe(data => {
            this.favorites = data
         });
        this.coursesService.getCourses().subscribe(data => {
           this.getImageData(data)
        });
    }

    favorite(event: any) {
        const course_id = event.target.id
        this.favoritesService.postFavorites(course_id).subscribe();
        if(event.target.checked){
            this.favorite_storage.push(course_id)
            localStorage.setItem('favorites', JSON.stringify(this.favorite_storage))
            this.favoritesService.setData(this.favorite_storage);
        } else {
            this.unsaveFavorites(course_id)
            localStorage.setItem('favorites', JSON.stringify(this.favorite_storage))
            this.favoritesService.setData(this.favorite_storage);
        }
    }

    unsaveFavorites(_id: string){
        const favorite_id = JSON.parse(localStorage.getItem('favorites')!);
        this.favorite_storage.splice(favorite_id?.indexOf(_id), 1);
    }

    isFavorite(id: any) {
        return this.favorites!.some((ele: { _id: any; }) => ele._id === id);
    }

    getImageData(_coursesData: Object) {
        this.coursesService.getFile().subscribe((imageData) => {
            this.checkImage(imageData, _coursesData)
        })
        return _coursesData
    }

    checkImage(imageData: any, _coursesData: Object) {
        this.courses = _coursesData
        imageData.forEach((image: any) =>  {
            this.courses.map((course: any) => {
                if(course._id.$oid == image._id.trim()) {
                    course['image_binary'] = image.image_binary
                }
                return course
            })
        })
    }

}