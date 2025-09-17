import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        title: 'Admin Dashboard'
    },
    {
        path: 'students',
        component: StudentsComponent,
        title: 'Students' 
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: 'Not Found Page'
    },
];
