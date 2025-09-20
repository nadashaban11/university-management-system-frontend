import { Injectable } from '@angular/core';
import { Course } from '../types/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient){}

  getCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.apiUrl);
   }

  addCourse(course:Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
   }

  deleteCourse(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
   }
}
