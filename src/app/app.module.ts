import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { EmpdashboardComponent } from './components/empdashboard/empdashboard.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { Auth } from './services/auth.guard';
import { FulldetailsComponent } from './components/fulldetails/fulldetails.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    AdminComponent,
    EmployeeComponent,
    ProfileComponent,
    EmpdashboardComponent,
    AdmindashboardComponent,
    FulldetailsComponent,
    UpdateProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
     
    }),
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatExpansionModule
  ],
  providers: [Auth,[{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
