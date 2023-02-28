import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart  } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnDestroy {

    event$: { unsubscribe: () => void; } | undefined

    currentRoute: string | undefined;

    constructor(private router: Router) {
        this.event$ = this.router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                this.currentRoute = event.url
            }
        })
    }

    ngOnDestroy() {
        this.event$!.unsubscribe();
    }

    setCurrentUrlColor(event: any) {
        const currentUrl = document.querySelector('.current-route');
        currentUrl?.classList.toggle('current-route');
        event.currentTarget.classList.toggle('current-route');
    }


    doRedirect(event: Event, path: string) {
        event.stopPropagation();
        this.router.navigate([path]);
        this.setCurrentUrlColor(event);
    }

}
