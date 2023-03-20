import { NgModule } from "@angular/core";
import { AllCoursesRoutingModule } from "./courses-routing.module";
import { AllCoursesComponent } from "./components/courses.component";
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { LoadingModule } from '../shared/loading/loading.module';


@NgModule({
    declarations: [
        AllCoursesComponent
    ],
    imports: [
        AllCoursesRoutingModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        LoadingModule
    ],
    exports: [
        AllCoursesComponent
    ]
})

export class AllCoursesModule {}