import { NgModule } from '@angular/core';
import { SnackBarComponent } from './snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
      SnackBarComponent,
  ],
  imports: [
    MatSnackBarModule
  ],
  exports: [
    SnackBarComponent,
  ],
})

export class SnackBarModule {}