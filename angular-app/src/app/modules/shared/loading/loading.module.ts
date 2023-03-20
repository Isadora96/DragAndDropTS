import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        LoadingComponent
  ],
  imports: [
    MatProgressSpinnerModule
    
  ],
  exports: [
    LoadingComponent
  ],
})

export class LoadingModule {}