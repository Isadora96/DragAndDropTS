import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent {

    constructor(private router: Router) {
        //console.log(router)
    }

    // doRedirect($event: Event, path: string) {
    //     $event.stopPropagation();
    //     this.router.navigate([path]);
    // }
}