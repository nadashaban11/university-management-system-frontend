import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { Student } from '../types/student';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

    students! : Student[];
    numOFStudents!:number;
    numOfCourses!:number;
    numOfEnrollments!:number;

  constructor(private studentsService : StudentsService,private courseService : CourseService, private enrollmentService : EnrollmentService){}

    ngOnInit() {
    this.studentsService.getAllStudents().subscribe((data : Student[])=>{
      this.students = data;
      this.numOFStudents=this.students.length;
    })
    this.courseService.getCourses().subscribe((data)=>{
      this.numOfCourses=data.length;
    });

    this.enrollmentService.getAllEnrollments().subscribe((data)=>{
      this.numOfEnrollments=data.length;
    });
  }


}
