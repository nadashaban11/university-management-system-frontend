import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { StudentsComponent } from './students/students.component';
import { AddCourseComponent } from './add-course/add-course.component';

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
        path: 'courses',
        component: CoursesComponent,
        title: 'Courses',
    
    }, {
        path: 'add-course',
        component: AddCourseComponent,
        title: 'Add Course',
    },
    
    {
        path: '**',
        component: NotFoundPageComponent,
        title: 'Not Found Page'
    },
];
