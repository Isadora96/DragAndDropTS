import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        HeaderComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent //to export needs to be declarated
  ],
})

export class SharedModule {}