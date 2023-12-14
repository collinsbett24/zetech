import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import Swal from 'sweetalert2';
import { MarkArray } from '../components/admin-home/pages/add-marks/add-marks.component';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService implements HttpInterceptor {

  constructor(private http: HttpClient, public loaderservice: LoaderService) { }

  configUrl = 'http://localhost:8000/api/';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderservice.isLoading.next(true);
    console.log('Request Http Interceptor....');
    const token = localStorage.getItem("token");
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ` + token
      }
    });
    return next.handle(req)
      .pipe(

        //retry on failure
        retry(0),

        //handle Errors
        catchError((error: HttpErrorResponse) => {

          Swal.fire('Error', 'HTTP Error: Failed!! Try again later', 'error');
          //TODO: Add error handling logic here
          // alert(`HTTP Error: ${req.url}`);
          return throwError(error);
        }),
        //profilling
        finalize(() => {
          const profilingMessage = `${req.method} "${req.urlWithParams}"`;
          console.log(profilingMessage);
          this.loaderservice.isLoading.next(false);
        })
      );
  }
  public login(data: FormData): Observable<any> {
    return this.http.post<any>(this.configUrl + "user/login", data);
  }

  public token(name: string): Observable<any> {
    return this.http.get<any>(`${this.configUrl}token/create?token_name=${name}`);
  }

  public AddUser(data: FormData): Observable<any> {
    return this.http.post<any>(this.configUrl + "user/create", data);
  }


  public getStudents(page: any, pageSize: any): Observable<any> {
    return this.http.get<any>(`${this.configUrl}users`);
  }

  public fetchStudents(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.configUrl}users/${courseId}`);
  }

  public getMarks(page: any, pageSize: any, status: any): Observable<any> {
    return this.http.get<any>(`${this.configUrl}marks`);
  }

  public getStudentsMarks(courseId: string, unitCode: string): Observable<any> {
    return this.http.get<any>(`${this.configUrl}${courseId}/marks/${unitCode}`);
  }

  public postMark(data: MarkArray): Observable<any> {
    return this.http.put<any>(`${this.configUrl}mark/`, data);
  }

  public getStudentMarks(admNo: string): Observable<any> {
    return this.http.get<any>(`${this.configUrl}marks/${admNo}`);
  }


  public getCourses(page: any, pageSize: any): Observable<any> {
    return this.http.get<any>(`${this.configUrl}courses`);
  }
  public get1Courses(admNo: any): Observable<any> {
    return this.http.get<any>(`${this.configUrl}courses${admNo}`);
  }


  public AddCourse(formData: any): Observable<any> {
    return this.http.post<any>(this.configUrl + "course", formData);
  }


  public AddService(formData: any): Observable<any> {
    return this.http.post<any>(this.configUrl + "course/new", formData);
  }


  public AddUnit(formData: FormData): Observable<any> {
    return this.http.post<any>(this.configUrl + `unit/add`, formData);
  }

  public GetUnits(): Observable<any> {
    return this.http.get<any>(this.configUrl + `units`);
  }

  public getUnits(courseCode: string): Observable<any> {
    return this.http.get<any>(`${this.configUrl}units/${courseCode}`);
  }


  postEditForm(Id: any, formData: FormData): Observable<any> {

    return this.http.put<any>(this.configUrl + `service/${Id}`, formData);
  }

  deleteService(ServiceId: any) {
    return this.http.delete(this.configUrl + "service/delete" + `?id=${ServiceId}`);
  }


  deleteStudent(transactionTypeId: any) {
    return this.http.delete(this.configUrl + "student/delete" + `?id=${transactionTypeId}`);
  }



}