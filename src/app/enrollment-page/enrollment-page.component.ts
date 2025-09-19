


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// interface Enrollment {
//   student: string;
//   course: string;
//   requestDate: string;
//   status: 'Approved' | 'Pending' | 'Rejected';
//   semester: string;
// }

// @Component({
//   selector: 'app-enrollment-page',
//   standalone: true,
//   imports: [CommonModule, NgbDropdownModule],
//   templateUrl: './enrollment-page.component.html',
//   styleUrls: ['./enrollment-page.component.css']
// })
// export class EnrollmentPageComponent {
//   enrollments: Enrollment[] = [
//     {
//       student: 'Raghad Ahmed',
//       course: 'CS101 - Introduction to Programming',
//       requestDate: 'Feb 10, 2024',
//       status: 'Approved',
//       semester: 'Fall 2024'
//     },
//     {
//       student: 'Malak Mohammed',
//       course: 'MATH201 - Calculus I',
//       requestDate: 'Feb 12, 2024',
//       status: 'Approved',
//       semester: 'Fall 2024'
//     },
//     {
//       student: 'Aya Yasser',
//       course: 'CS201 - Data Structures',
//       requestDate: 'Feb 15, 2024',
//       status: 'Pending',
//       semester: 'Fall 2024'
//     }
//   ];

//   get pendingCount() {
//     return this.enrollments.filter(e => e.status === 'Pending').length;
//   }

//   get approvedCount() {
//     return this.enrollments.filter(e => e.status === 'Approved').length;
//   }

//   get rejectedCount() {
//     return this.enrollments.filter(e => e.status === 'Rejected').length;
//   }

//   get totalCount() {
//     return this.enrollments.length;
//   }

//   approve(enrollment: Enrollment) {
//     enrollment.status = 'Approved';
//   }

//   reject(enrollment: Enrollment) {
//     enrollment.status = 'Rejected';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EnrollmentService } from '../services/enrollment.service';
export interface Enrollment {
  _id: string;   
  student: {
    _id: string;
    name: string;
  };
  course: {
    _id: string;
    title: string;
  };
  status: string;
  grade?: string;
}

@Component({
  selector: 'app-enrollment-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './enrollment-page.component.html',
  styleUrls: ['./enrollment-page.component.css']
})
export class EnrollmentPageComponent implements OnInit {
  enrollments: Enrollment[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.enrollmentService.getAllEnrollments().subscribe({
      next: (data: any) => {
        console.log("Enrollments from backend:", data);
        
        if (Array.isArray(data)) {
          this.enrollments = data;
        } 
        
        else if (data && Array.isArray(data.data)) {
          this.enrollments = data.data;
        } 
        else {
          this.enrollments = [];
        }
      },
      error: (err) => {
        console.error("Error loading enrollments:", err);
      }
    });
  }

  get pendingCount() {
    return this.enrollments.filter(e => e.status === 'WAITLISTED').length;
  }

  get approvedCount() {
    return this.enrollments.filter(e => e.status === 'ENROLLED').length;
  }

  get rejectedCount() {
    return this.enrollments.filter(e => e.status === 'DROPPED').length;
  }

  get totalCount() {
    return this.enrollments.length;
  }

  approve(enrollment: Enrollment) {
    this.enrollmentService.updateEnrollment(enrollment._id, { status: 'ENROLLED' })
      .subscribe(() => enrollment.status = 'ENROLLED');
  }

  reject(enrollment: Enrollment) {
    this.enrollmentService.updateEnrollment(enrollment._id, { status: 'DROPPED' })
      .subscribe(() => enrollment.status = 'DROPPED');
  }
}




