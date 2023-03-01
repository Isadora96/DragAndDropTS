import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit(): void {
        const currentUrl = location.href.split('/')[3]; 
        const navLinks = document.querySelectorAll('.nav-link'); 
        navLinks.forEach(link => {
          if (link.id === currentUrl) {
            link.classList.add('current-route');
          }
        });
        
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
