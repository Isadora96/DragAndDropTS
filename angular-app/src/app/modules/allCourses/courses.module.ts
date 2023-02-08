import { NgModule } from "@angular/core";
import { AllCoursesRoutingModule } from "./courses-routing.module";
import { AllCoursesComponent } from "./components/courses.component";


@NgModule({
    declarations: [
        AllCoursesComponent
    ],
    imports: [
        AllCoursesRoutingModule
    ],
    exports: [
        AllCoursesComponent
    ]
})

export class AllCoursesModule {}