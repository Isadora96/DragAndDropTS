import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'createcourse',
      loadChildren: () => import('./modules/createCourse/createCourse.module').then(m => m.CreateCourseModule)
    },
    {
      path: 'createcourse/:course_id',
      loadChildren: () => import('./modules/createCourse/createCourse.module').then(m => m.CreateCourseModule)
    },
    {
      path: '',
      loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'allcourses',
      loadChildren: () => import('./modules/allCourses/courses.module').then(m => m.AllCoursesModule)
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
