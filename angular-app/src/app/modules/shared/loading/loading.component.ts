
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    constructor() {}
    ngOnInit(): void {
        const id = document.querySelector('#create-course')! as HTMLDivElement;
        id.innerHTML = '<mat-spinner></mat-spinner>'
    }
}