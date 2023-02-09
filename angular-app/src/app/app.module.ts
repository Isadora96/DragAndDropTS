import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { CreateCourseModule } from './modules/createCourse/createCourse.module';
import { HomeModule } from './modules/home/home.module';
import { AllCoursesModule } from './modules/allCourses/courses.module';

@NgModule ({
    declarations: [
    AppComponent,
    //HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    CreateCourseModule,
    HomeModule,
    AllCoursesModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}