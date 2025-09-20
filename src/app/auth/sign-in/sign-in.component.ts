import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.signInForm.controls;
  }

  handleSubmit() {
    this.submitted = true;
    if (this.signInForm.invalid) return;

    this.authService.signIn(this.signInForm.value).subscribe({
  next: (res) => {
    console.log('Login success:', res);

    if (res.token) {
      this.authService.saveToken(res.token);
    }

    this.router.navigate(['/admin-dashboard']);
  },
  error: (err) => {
    console.error('Login failed:', err);
    this.errorMessage = 'Invalid email or password';
  }
});
  }
}
