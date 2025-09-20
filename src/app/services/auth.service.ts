import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) {}

  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  signIn(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
