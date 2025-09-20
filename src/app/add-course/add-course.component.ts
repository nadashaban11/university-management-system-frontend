import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import  {Router, RouterLink} from '@angular/router';
import { Course } from '../types/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [FormsModule, RouterLink],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
 
  course:Course = 
  {
  title: '', 
  department: '',
  instructor: ''
  };
  constructor( private router:Router,private courseService:CourseService){}
 

  onSave(){
    this.courseService.addCourse(this.course).subscribe(() => {
      this.router.navigate(['/courses']);
    });
  }

}
