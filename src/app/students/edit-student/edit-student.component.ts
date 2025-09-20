import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../../types/student';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {

  editForm!: FormGroup;
  studentId!: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentId')!;

    // Initialize form
    this.editForm = this.fb.group({
      studentId: [{ value: this.studentId, disabled: true }],
      name: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['',[ Validators.pattern(/^\d{11}$/) ]],
      year: ['', Validators.required],
      department: ['', Validators.required]
    });

    // Load student data
    this.studentsService.getStudentById(this.studentId).subscribe((student: Student) => {
      this.editForm.patchValue({
        studentId: student.studentId,
        name: student.name,   
        email: student.email,
        phone: student.phone,
        year: student.year,
        department: student.department
      });
    });
  }

  get formControls() {
    return this.editForm.controls
  }

onSubmit() {
  this.submitted = true;

  if (this.editForm.valid) {
    const updatedStudent = { ...this.editForm.getRawValue() };

    this.studentsService.updateStudent(this.studentId, updatedStudent).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Student updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/students']); // navigate after pressing OK
        });
      },
      error: (err) => {
        console.error('Backend error:', err);

        // Extract meaningful message from backend
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