import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http : HttpClient) { }

  getAllStudents(){
    return this.http.get<Student[]>("http://localhost:8080/api/students");
  }

  getStudentById(studentId: string) {
    return this.http.get<Student>(`http://localhost:8080/api/students/${studentId}`);
  }

  updateStudent(studentId: string, studentData: Student) {
    return this.http.patch(`http://localhost:8080/api/students/${studentId}`, studentData);
  }

  deleteStudent(studentId: string) {
    return this.http.delete(`http://localhost:8080/api/students/${studentId}`);
  }

  addStudent(studentData: Student) {
    return this.http.post("http://localhost:8080/api/students", studentData);
  }

}
