import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  title: string = "Zetech University";

  selector: string = 'app-add-course';

  admin: boolean = true;

  Message: string = '';

  ErrorMessage: string = '';

  serviceForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });


  constructor(public loader: LoaderService, private fb: FormBuilder, private api: ApiServiceService, private router: Router) {
    var role = localStorage.getItem('role');
    var token = localStorage.getItem('token');
    if (role == "Admin" && token != null) {
      this.admin = true;
    } else if (role == "Student" && token != null) {
      this.admin = false;
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {

  }

  switch_selector(selection: string) {
    this.selector = selection;
  }
  get f() {
    return this.serviceForm.controls;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}
