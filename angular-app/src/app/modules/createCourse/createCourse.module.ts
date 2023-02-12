import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreateCourseComponent } from './components/createCourse.component';
import { CreateCourseRoutingModule } from './createCourse-routing.module';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        CreateCourseComponent
    ],
    imports: [
        CreateCourseRoutingModule,
        MatInputModule,
        FormsModule
    ],
    exports: [
        CreateCourseComponent
    ]
})

export class CreateCourseModule {}