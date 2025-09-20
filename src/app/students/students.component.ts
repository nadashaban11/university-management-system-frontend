import { Component } from '@angular/core';
import { Student } from '../types/student';
import { StudentsService } from '../services/students.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  imports: [CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  students! : Student[];
  private searchTerms = new Subject<string>();

  constructor(private studentsService : StudentsService){}

  ngOnInit() {
    this.studentsService.getAllStudents().subscribe((data : Student[])=>{
      this.students = data;
    })

        // Live search
    this.searchTerms.pipe(
      debounceTime(300),          // wait 300ms after typing stops
      distinctUntilChanged(),     // ignore if same value as before
      switchMap((term: string) => 
        term.trim() 
          ? this.studentsService.searchStudents(term) 
          : this.studentsService.getAllStudents()
      )
    ).subscribe((data: Student[]) => this.students = data);
  }
search(event: Event) {
  const value = (event.target as HTMLInputElement).value.trim();

  if (!value) {
    // if input is empty → reload all students
    this.studentsService.getAllStudents().subscribe(data => {
      this.students = data;
    });
    return;
  }

  this.studentsService.searchStudents(value).subscribe({
    next: (data) => {
      this.students = data;
    },
    error: (err) => {
      if (err.status === 404) {
        this.students = []; // clear list if no match
      } else {
        console.error('Search error:', err);
      }
    }
  });
}


  deleteStudent(studentId: string) {
    this.studentsService.deleteStudent(studentId).subscribe(() => {
      this.students = this.students.filter(student => student.studentId !== studentId);
    });
  }

}
