import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SignInComponent },
];
