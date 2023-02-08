import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    constructor(private router: Router) {
        console.log(router)
    }

    // doRedirect($event: Event, path: string) {
    //     $event.stopPropagation();
    //     this.router.navigate([path]);
    // }
}