import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { Course } from './models/course.model';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        HeaderComponent,
        TooltipComponent,        
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    
  ],
  exports: [
    HeaderComponent, //to export needs to be declarated
    TooltipComponent,
    
  ],
})

export class SharedModule {}