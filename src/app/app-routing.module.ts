import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { EmpdashboardComponent } from './components/empdashboard/empdashboard.component';
import { Auth } from './services/auth.guard';
import { FulldetailsComponent } from './components/fulldetails/fulldetails.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  {path:'',redirectTo:"/register",pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[Auth]},
  {path:'empdashboard',component:EmpdashboardComponent,canActivate:[Auth]},
  {path:'admindashboard',component:AdmindashboardComponent,canActivate:[Auth]},
  {path:'full-details/:emailId',component:FulldetailsComponent,canActivate:[Auth]},
  {path:'update-profile/:emailId',component:UpdateProfileComponent,canActivate:[Auth]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
