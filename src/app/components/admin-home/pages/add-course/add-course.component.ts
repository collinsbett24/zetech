import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  constructor(public loader:LoaderService, private fb:FormBuilder){
    
  }
  serviceForm = this.fb.group({
    code:['', Validators.required],
    description:['', Validators.required]
  });

  ngOnInit(): void {
    // this.api.getTransactionType().subscribe((response:any)=>{
    //   // this.TransactionTypes=response;
    // },(error:any)=>{})
  }

  get f(){
    return this.serviceForm.controls;
  }

  OnSubmit(){
    // var formData = new FormData();
    // formData.append('code', this.serviceForm?.get('code')?.value);
    // formData.append('description', this.serviceForm?.get('description')?.value);

    // this.api.AddService(formData).subscribe(
    //   (res:any)=>{
    //     this.Message='Data Added successfully';
    //   },
    //   (error:any)=>{
    //     this.ErrorMessage='Data Failed to add';
    //   }
    // );


  }
}
