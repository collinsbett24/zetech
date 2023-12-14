import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';


const routes: Routes = [
  {path:'', component:LoginPageComponent},
  {  path:"home", component:HomePageComponent},
  {path:"admin", component:AdminHomeComponent},
  {path: "login", component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
