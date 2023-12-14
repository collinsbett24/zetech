import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api.service';
import { CsvService } from 'src/app/services/csv.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.css']
})
export class ViewMarksComponent {
  Marks: Array<any> = [];
  Message: string = '';
  ErrorMessage: string = '';

  page = 0;
  pageSize = 10;
  totalPages: number = 2;


  admin = true;

  constructor(private api: ApiServiceService, public loader: LoaderService, private csvService: CsvService, private fb: FormBuilder) {
    var role = localStorage.getItem('role');
    var admNo = localStorage.getItem('admNo');
    if (role == "Admin") {
      this.admin = true;
      this.getStudentMarks();
    } else if (role == "Student" && admNo != null) {
      this.admin = false;
      this.api.getStudentMarks(admNo).subscribe((response: any) => {
        this.Marks = response.data;
      });
    }

    this.api.getCourses(10, 5).subscribe(
      (response: any) => {
        this.Courses = response.data;
        this.ErrorMessage = '';
      },

      (error: any) => {
        this.ErrorMessage = 'Failed to fetch courses';
      });
  }
  Courses: any = [];
  Units: any = [];
  Students: any = [];

  currentUnitCode = '';


  serviceForm = this.fb.group({
    Marks: this.fb.array([this.fb.control('')]),
    code: ['', Validators.required],
  });

  selectUnit = this.fb.group({
    courseId: ['', Validators.required],
    unitCode: ['', Validators.required]
  });

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

  getStudentMarks() {
    var courseId = this.selectUnit?.get('courseId')?.value || '';
    var unitCode = this.selectUnit?.get('unitCode')?.value || '';
    this.currentUnitCode = unitCode;

    this.api.getStudentsMarks(courseId, unitCode).subscribe(
      (res: any) => {
        this.Marks = res.data;
      },
      (error: any) => {
        this.ErrorMessage = 'Students Failed to fetch';
      }
    );
  }



  getData() {
    this.api.getMarks(this.page, this.pageSize, "completed").subscribe((response: any) => {

      this.Marks = response.data;
      console.log(this.Marks);
      this.totalPages = response.totalPages;

    });
  }

  nextPage() {
    this.page++;
    this.getData();
  }

  previousPage() {
    this.page--;
    if (this.page === -1) {
      this.page = this.totalPages - 1;
    }
    this.getData();
  }

  exportDataToCsv() {
    if (this.Marks.length > 0) {
      this.csvService.exportToCsv(this.Marks, 'marks.csv');
    }
    else {
      this.ErrorMessage = "No Data to export. Have some Marks Added";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: this.ErrorMessage,
      });
    }
  }
  

}
