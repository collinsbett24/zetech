import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent {
  Courses: Array<any> = [];

  page = 0;
  pageSize = 10;
  totalPages: number = 2;

  constructor(private api: ApiServiceService, public loader: LoaderService) {
    this.getData();
  }

  getData() {
    this.api.getCourses(this.page, this.pageSize).subscribe((response: any) => {
      this.Courses = response.data;
      console.log(this.Courses);

      // this.totalPages = response.totalPages;

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
