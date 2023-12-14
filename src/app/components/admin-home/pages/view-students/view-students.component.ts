import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent {
  Students:Array<any>=[];

  page = 0;
  pageSize = 10;
  totalPages: number = 2;

  constructor(private api:ApiServiceService, public loader:LoaderService) {
     this.getData();
   }

  getData(){
    this.api.getStudents(this.page, this.pageSize).subscribe((response:any)=>{
      this.Students = response.data;
      // this.totalPages = response.totalPages;
      console.log(this.Students);
      

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
}
