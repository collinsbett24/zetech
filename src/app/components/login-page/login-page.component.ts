import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  Message: string = '';
  ErrorMessage: string = '';

  serviceForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(public loader: LoaderService, private fb: FormBuilder, private api: ApiServiceService, private router: Router) {

  }

  get f() {
    return this.serviceForm.controls;
  }

  OnSubmit() {
    var formData = new FormData();
    formData.append('password', this.serviceForm?.get('password')?.value || '');
    formData.append('username', this.serviceForm?.get('username')?.value || '');

    this.api.login(formData).subscribe(
      (res: any) => {
        if (res.status == 200) {
          console.log(res);
          this.Message = res.message;
          this.ErrorMessage = '';
          localStorage.setItem('role', res.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem("admNo", res.studentId);
          this.router.navigate(['/admin']);
        } else {
          this.Message = '';
          this.ErrorMessage = res.message;
        }

      },
      (error: any) => {
        console.log(error);
        this.ErrorMessage = 'Login failed! Kindly try again later';
        this.Message = '';
      }
    );

  }

}
