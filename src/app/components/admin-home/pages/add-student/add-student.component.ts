import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  Message: string='';
  ErrorMessage: string='';
  Courses:any=[];

  constructor(public loader:LoaderService, private fb:FormBuilder, private api:ApiServiceService){

    this.api.getCourses(10,5).subscribe(
    (response:any)=>{
      this.Courses=response.data;
      this.ErrorMessage='';
    },

    (error:any)=>{
      this.ErrorMessage='Failed to fetch courses';
    }); 
        
}
      serviceForm = this.fb.group({
        courseId:['', Validators.required],
        admNo:['', Validators.required],
        id:['', Validators.required],
        name:['', Validators.required],
        role:['', Validators.required]
      });

      ngOnInit(): void {
        
      }

      get f(){
        return this.serviceForm.controls;
      }

      OnSubmit(){
        
        var formData = new FormData();
        formData.append('courseId', this.serviceForm?.get('courseId')?.value || '');
        formData.append('admNo', this.serviceForm?.get('admNo')?.value || '');
        formData.append('password', this.serviceForm?.get('id')?.value || '');
        formData.append('name', this.serviceForm?.get('name')?.value || '');
        formData.append('role', this.serviceForm?.get('role')?.value || '');

        console.log(this.serviceForm.value);

        this.api.AddUser(formData).subscribe(
          (res:any)=>{
            console.log('subscription'+res);
            this.ErrorMessage='';
            this.Message='Data Added successfully';
          },
          (error:any)=>{
            this.Message='';
            this.ErrorMessage='Data Failed to add';
          }
        );


      }
}
