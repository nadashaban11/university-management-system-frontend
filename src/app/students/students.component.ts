import { Component } from '@angular/core';
import { Student } from '../types/student';
import { StudentsService } from '../services/students.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  imports: [CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  students! : Student[];

  constructor(private studentsService : StudentsService){}

  ngOnInit() {
    this.studentsService.getAllStudents().subscribe((data : Student[])=>{
      this.students = data;
    })
  }

  deleteStudent(studentId: string) {
    this.studentsService.deleteStudent(studentId).subscribe(() => {
      this.students = this.students.filter(student => student.studentId !== studentId);
    });
  }

}
