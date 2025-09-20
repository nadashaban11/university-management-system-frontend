import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { StudentsComponent } from './students/students.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EnrollmentPageComponent } from './enrollment-page/enrollment-page.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { EditStudentComponent } from './students/edit-student/edit-student.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        title: 'Home Page'
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        title: 'Admin Dashboard',
        canActivate: [authGuard]
    },
    {
        path: 'students',
        component: StudentsComponent,
        title: 'Students',
        canActivate: [authGuard]
    },
    {
        path: 'courses',
        component: CoursesComponent,
        title: 'Courses',
        canActivate: [authGuard]
    
    }, {
        path: 'add-course',
        component: AddCourseComponent,
        title: 'Add Course',
        canActivate: [authGuard]
        
    },
    {
        path: 'add-student',
        component: AddStudentComponent,
        title: 'Add Student',
        canActivate: [authGuard]
    },
    {
        path: 'edit-student/:studentId',
        component: EditStudentComponent,
        title: 'Edit Student',
        canActivate: [authGuard] 
    },
    {
         path: 'enrollments',
        component: EnrollmentPageComponent ,
         title: 'Enrollments',
        canActivate: [authGuard]

    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: 'Not Found Page'
    },
];
