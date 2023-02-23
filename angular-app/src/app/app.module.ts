import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { CreateCourseModule } from './modules/createCourse/createCourse.module';
import { HomeModule } from './modules/home/home.module';
import { AllCoursesModule } from './modules/allCourses/courses.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule ({
    declarations: [
    AppComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    CreateCourseModule,
    HomeModule,
    AllCoursesModule,
    FavoritesModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}