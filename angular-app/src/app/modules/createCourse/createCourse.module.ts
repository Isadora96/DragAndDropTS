import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../shared/loading/loading.module';
import { CreateCourseComponent } from './components/createCourse.component';
import { CreateCourseRoutingModule } from './createCourse-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SnackBarModule } from '../shared/snackbar/snackbar.module';
@NgModule({
    declarations: [
        CreateCourseComponent
    ],
    imports: [
        CreateCourseRoutingModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        CommonModule,
        LoadingModule,
        SnackBarModule
    ],
    exports: [
        CreateCourseComponent
    ]
})

export class CreateCourseModule {}