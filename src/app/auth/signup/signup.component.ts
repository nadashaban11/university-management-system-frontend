import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  signUpForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signUpForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
      ]],
      role: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  handleSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) return;

    const formData = this.signUpForm.value;

    this.http.post('http://localhost:8000/api/auth/register', formData)
      .subscribe({
        next: (res: any) => {
          console.log('User registered:', res);
          alert('Registration successful!');
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Something went wrong during registration.');
        }
      });
  }
}