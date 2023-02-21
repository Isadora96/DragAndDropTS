import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateCourseComponent } from './components/createCourse.component';
import { CreateCourseRoutingModule } from './createCourse-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [
        CreateCourseComponent
    ],
    imports: [
        CreateCourseRoutingModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        CommonModule
    ],
    exports: [
        CreateCourseComponent
    ]
})

export class CreateCourseModule {}