import {Component, inject} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

/**
 * @title Snack-bar with an annotated custom component
 */
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
})
export class SnackBarComponent {

  durationInSeconds = 3;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(SuccessfulMessageComponent, {
      duration: this.durationInSeconds * 1000
    });
  }
}

@Component({
  selector: 'app-snackbar-example',
  templateUrl: 'snackbar-example.component.html',
  styleUrls: ['./snackbar.component.css'],
})
export class SuccessfulMessageComponent {
  snackBarRef = inject(MatSnackBarRef);
  message = 'Successful operation!';
}