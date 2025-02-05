import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { LoadingModule } from '../shared/loading/loading.module';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        HomeRoutingModule,
        MatTableModule,
        MatCheckboxModule,
        MatTabsModule,
        CommonModule,
        LoadingModule
    ],
    exports: [
        HomeComponent
    ],
})

export class HomeModule {}