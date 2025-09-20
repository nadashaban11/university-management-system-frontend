import { Component,OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { PipeTransform } from '@angular/core';
import { Course } from '../types/course';
import { CourseService } from '../services/course.service';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [ ReactiveFormsModule, NgbHighlight, RouterLink, RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses:Course []=[]
  constructor(private courseService:CourseService){}
   
  loadCourses():void{
    this.courseService.getCourses().subscribe((courses)=>{
      this.courses = courses;
    });
    this.showAlert = false;
  }
  ngOnInit(): void {
    this.loadCourses();
  }
   
  filter:FormControl<string> = new FormControl('', { nonNullable: true });
  get filteredCourses(): Course[] {
    const term = this.filter.value?.toLowerCase().trim();
    if (!term) return this.courses;
    return this.courses.filter(c => c.title.toLowerCase().includes(term));
  }
  search(text: string, pipe: PipeTransform): Course[] {
    return this.courses.filter((course) => {
      const term = text.toLowerCase();
      return (
        course.title.toLowerCase().includes(term)
      );
    });
  }
  
  showAlert: boolean = false;
  
  

  deleteCourse(course:Course):void{
    this.courseService.deleteCourse(course._id!).subscribe(() => {
      this.courses = this.courses.filter(c => c._id !== course._id);

  setTimeout(()=>{
        this.showAlert = true;
      },3000)
    });
}

}