import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  Message: string='';
  ErrorMessage: string='';
  constructor(public loader:LoaderService, private fb:FormBuilder, private api:ApiServiceService){
    
  }
  serviceForm = this.fb.group({
    faculty:['', Validators.required],
    code:['', Validators.required],
    courseName:['', Validators.required]
  });

  ngOnInit(): void {
  }

  get f(){
    return this.serviceForm.controls;
  }

  OnSubmit(){
    var formData = new FormData();
    formData.append('code', this.serviceForm?.get('code')?.value || '');
    formData.append('faculty', this.serviceForm?.get('faculty')?.value || '');
    formData.append('courseName', this.serviceForm?.get('courseName')?.value || '');

    this.api.AddCourse(formData).subscribe(
      (res:any)=>{
        this.Message=res.message;
      },
      (error:any)=>{
        this.ErrorMessage='Data Failed to add';
      }
    );
  }
}
