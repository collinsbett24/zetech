import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-units',
  templateUrl: './add-units.component.html',
  styleUrls: ['./add-units.component.css']
})
export class AddUnitsComponent {
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
    unitName:['', Validators.required],
    code:['', Validators.required],
  });

  ngOnInit(): void {
    
  }

  get f(){
    return this.serviceForm.controls;
  }

  OnSubmit(){
    var formData = new FormData();
    formData.append('courseId', this.serviceForm.get('courseId')?.value || '');
    formData.append('unitName', this.serviceForm.get('unitName')?.value || '');
    formData.append('code', this.serviceForm?.get('code')?.value || '');

    this.api.AddUnit(formData).subscribe(
      (res:any)=>{
        this.Message='Data Added successfully';
        this.ErrorMessage='';
      },
      (error:any)=>{
        this.ErrorMessage='Data Failed to add';
        this.Message='';
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    );

  }
  
}
