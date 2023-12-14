import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

export interface MarkArray {
  admNo: number,
  mark: string,
  unitCode: string
}

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css']
})
export class AddMarksComponent {

  myInputValue = 0;

  Message: string = '';
  ErrorMessage: string = '';
  Courses: any = [];
  Units: any = [];
  Students: any = [];

  currentUnitCode = '';

  constructor(public loader: LoaderService, private fb: FormBuilder, private api: ApiServiceService) {
    this.api.getCourses(10, 5).subscribe(
      (response: any) => {
        this.Courses = response.data;
        this.ErrorMessage = '';
      },

      (error: any) => {
        this.ErrorMessage = 'Failed to fetch courses';
      });
  }
  serviceForm = this.fb.group({
    Marks: this.fb.array([this.fb.control('')]),
    code: ['', Validators.required],
  });

  selectUnit = this.fb.group({
    courseId: ['', Validators.required],
    unitCode: ['', Validators.required]
  });

  ngOnInit(): void { }


  getUnits(courseCode: string) {
    this.api.getUnits(courseCode).subscribe(
      (response: any) => {

        this.Units = response.data;
        if (this.Units.length != 0) {
        } else {
          this.ErrorMessage = response.message;
        }
      },

      (error: any) => {
        this.ErrorMessage = 'Failed to fetch courses';
      });
    console.log(courseCode);
  }

  get f() {
    return this.serviceForm.controls;
  }

  getStudents() {
    var courseId = this.selectUnit?.get('courseId')?.value || '';
    this.currentUnitCode = this.selectUnit?.get('unitCode')?.value || '';

    this.api.fetchStudents(courseId).subscribe(
      (res: any) => {
        this.Students = res.data;
      },
      (error: any) => {
        this.ErrorMessage = 'Students Failed to fetch';
      }
    );
  }

  onTabPress(studentId: number, value: string) {
    const formData: MarkArray = {
      admNo: studentId,
      mark: value,
      unitCode: this.currentUnitCode
    }

    console.log(formData);
    this.api.postMark(formData).subscribe(
      (resp => {

      }),
      (error => {
        this.ErrorMessage = "Failed to update marks" + studentId + " & " + value;

      }));

  }

  OnSubmit() {
    var formData = new FormData();
    formData.append('studentId', this.serviceForm?.get('code')?.value || '');
    // formData.append('Marks', this.serviceForm?.controls.Marks.get());

    this.api.AddService(formData).subscribe(
      (res: any) => {
        this.Message = 'Data Added successfully';
      },
      (error: any) => {
        this.ErrorMessage = 'Data Failed to add';
      }
    );
  }
}
