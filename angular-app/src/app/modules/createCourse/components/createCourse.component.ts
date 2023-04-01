import { Component, ElementRef } from '@angular/core';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { Course, CourseUpdate } from '../../shared/models/course.model';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../shared/snackbar/snackbar.component';
@Component({
    selector: 'app-create-course',
    templateUrl: './createCourse.component.html',
    styleUrls: ['./createCourse.component.css'],
    providers: [SnackBarComponent]
})

export class CreateCourseComponent {

  title: string = '';
  description: string = '';
  people!: number;
  author: string = '';
  course: any = [];
  isUpdate: boolean = false;
  selectValue: any;
  isDisabled: boolean = false;
  isLoading: boolean = false;

  constructor(private coursesService: CoursesService, private router: Router, private elementRef: ElementRef, private snackbar: SnackBarComponent) { 
    let allCourses: any = [];
    this.coursesService.getCourses().subscribe(data => {
      allCourses = data
      if(allCourses.length >= 10) {
        const btnCreate = document.querySelector('#create-btn') as HTMLButtonElement;
        this.isDisabled = true;
        btnCreate?.classList.add('create-btn-disabled');
        btnCreate?.setAttribute('title', 'To add a course please delete a least one!')
      }
    })
  }

  ngOnInit() {
    if(this.router.url.includes('createcourse/')) {
      this.isUpdate = true;
      this.getSingleCourse();
    }
  }

  newCourse() {
    const hasSpace = /\s/.test(this.author);

    if(!this.title || !this.description || !this.people || !this.author) {
      return
    }

    if(!hasSpace) {
      window.alert('Your name must have a lastname separeted with space!');
      return;
    }
    const course = new Course(this.author, this.title, this.description, this.people);
    this.isLoading = true;
    this.coursesService.postCourse(course).subscribe(
      (response) => {
        this.handleImageInput(response.split(':')[1].trim());
        this.isLoading = false;
        this.snackbar.openSnackBar()
        this.cleanFields();
      },
    (error) => {
      window.alert(error.error.message);
    }
    )
  }

  getSingleCourse(){
    const _id = this.router.url.split('/')[2]
    this.coursesService.getSingleCourse(_id).subscribe(response => {
      this.course = response
    })
  }

  doUpdate(event: Event) {
    event.stopPropagation();
    const _id = this.router.url.split('/')[2]
    const title = document.querySelector('#title-update') as HTMLInputElement;
    const description = document.querySelector('#description-update') as HTMLInputElement;
    const people = document.querySelector('#people-update') as HTMLInputElement;
    const select = document.querySelector('#select') as HTMLSelectElement;
    const span = document.querySelector('#select-required') as HTMLSpanElement;
    const homeUrl = document.querySelector('.home');

    this.selectValue = select.textContent?.toLowerCase();

    if(!this.selectValue) {
      span.textContent = 'Make a selection';
      span.setAttribute('class', 'select-required');
      return
    }

    const course = new CourseUpdate(_id, title.value, description.value, Number(people.value), this.selectValue)
    this.isLoading = true;
    this.coursesService.updateCourse(course).subscribe(response => {
      this.handleImageInput(_id)
      this.snackbar.openSnackBar();
      this.isLoading = false;
      this.router.navigate(['/']);
      homeUrl!.classList.add('current-route');
    },
    (error) => {
      window.alert(error.error.message);
    })

  }

  handleImageInput(course_id: string) {
    const inputFile = this.elementRef.nativeElement.querySelector('#myfile');
    const fileToUpload = inputFile.files[0];
    if(!fileToUpload) { return }
    const reader = new FileReader();
    const xhr = new XMLHttpRequest();


    xhr.open(
      "POST",
      './api/v1/upload/file',
      
    );
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
    xhr.overrideMimeType("image/plain; charset=x-user-defined-binary");
    reader.onload = (evt) => {
      let params = {
        "image_id": course_id,
        "image_binary": evt.target?.result
      }
      xhr.send(JSON.stringify(params));
    };
    reader.readAsDataURL(fileToUpload)
  }

  cleanFields() {
    const title = document.querySelector('#title') as HTMLInputElement;
    const description = document.querySelector('#description') as HTMLInputElement;
    const people = document.querySelector('#people') as HTMLInputElement;
    const author = document.querySelector('#author') as HTMLInputElement;

    title.value = ''
    description.value = ''
    people.value = ''
    author.value = ''
  }
}
