import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../types/course';
@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private courseService:CourseService){}
  courses:Course []=[]
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses)=>{
      this.courses = courses;
    });
  }
 
}
