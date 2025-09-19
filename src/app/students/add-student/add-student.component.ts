import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../../types/student';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  addForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Initialize form
    this.addForm = this.fb.group({
      studentId: ['', [ Validators.required, Validators.pattern(/^\d{8}$/) ]],
      name: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['',[ Validators.pattern(/^\d{11}$/) ]],
      year: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  get formControls() {
    return this.addForm.controls
  }

onSubmit() {
  this.submitted = true;
  if (this.addForm.valid) {
    const addedStudent = { ...this.addForm.getRawValue() };

    this.studentsService.addStudent(addedStudent).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Student added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/students']);
        });
      },
      error: (err) => {
        console.error('Backend error:', err);

        // Extract error message from backend response
        const errorMessage = err.error?.Error || err.error?.message || 'Something went wrong';

        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}


}