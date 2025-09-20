// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EnrollmentService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map} from 'rxjs';

export interface Enrollment {
  _id?: string;
  student: string;
  course: string;
  status: 'ENROLLED' | 'WAITLISTED' | 'DROPPED';
  grade?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:8080/api/enrollments';

  constructor(private http: HttpClient) {}

  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data)   
    );
  }

  getEnrollmentById(id: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  updateEnrollment(id: string, enrollment: Partial<Enrollment>): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${this.apiUrl}/${id}`, enrollment);
  }

  deleteEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

