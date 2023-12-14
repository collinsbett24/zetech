import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  title = 'zetech';

  myForm: FormGroup = new FormGroup({
    'studentData': new FormGroup({
      'name': new FormControl
    }),
    'id': new FormControl('006'),
    'marks': new FormArray([])
  })

  constructor(private fb: FormBuilder, private formGroup: FormGroup) { }

  ngOnInit() {

  }

  onAddStudent() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.myForm.get('marks')).push(control);
  }

}
