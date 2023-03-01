import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    declarations: [
        HeaderComponent,
        TooltipComponent,    
        FooterComponent    
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule
    
  ],
  exports: [
    HeaderComponent, //to export needs to be declarated
    TooltipComponent,
    FooterComponent
  ],
})

export class SharedModule {}