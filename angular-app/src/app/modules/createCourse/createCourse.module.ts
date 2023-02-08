import { NgModule } from '@angular/core';
import { CreateCourseComponent } from './components/createcourse.component';
import { CreateCourseRoutingModule } from './createCourse-routing.module';


@NgModule({
    declarations: [
        CreateCourseComponent
    ],
    imports: [
        CreateCourseRoutingModule,
    ],
    exports: [
        CreateCourseComponent
    ]
})

export class CreateCourseModule {}