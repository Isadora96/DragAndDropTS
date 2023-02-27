import { Component, OnDestroy } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd, NavigationStart  } from '@angular/router';
import { Location } from '@angular/common';


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


    ngAfterView() {

    }

    doRedirect($event: Event, path: string) {
        $event.stopPropagation();
        this.router.navigate([path]);
    }

}
