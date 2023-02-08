import { Component, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(private router: Router) {
        //console.log(router)
    }

    doRedirect($event: Event, path: string) {
        $event.stopPropagation();
        this.router.navigate([path]);
    }

    doRedirectHome($event: Event, path: string) {
        $event.stopPropagation();
        this.router.navigate([path]);
    }
}
