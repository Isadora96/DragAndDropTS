import { NgModule } from "@angular/core";
import { AllCoursesRoutingModule } from "./courses-routing.module";
import { AllCoursesComponent } from "./components/courses.component";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AllCoursesComponent
    ],
    imports: [
        AllCoursesRoutingModule,
        CommonModule
    ],
    exports: [
        AllCoursesComponent
    ]
})

export class AllCoursesModule {}