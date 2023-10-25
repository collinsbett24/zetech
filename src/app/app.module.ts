import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AddCourseComponent } from './components/admin-home/pages/add-course/add-course.component';
import { AddStudentComponent } from './components/admin-home/pages/add-student/add-student.component';
import { AddMarksComponent } from './components/admin-home/pages/add-marks/add-marks.component';
import { AddUnitsComponent } from './components/admin-home/pages/add-units/add-units.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    HomePageComponent,
    AddCourseComponent,
    AddStudentComponent,
    AddMarksComponent,
    AddUnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
