import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('500ms ease-out', style({ transform: 'translateX(-100%)' })),
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('600ms ease-out', style({ transform: 'translateX(100%)' })),
      ])
    ])
  ],

})
export class LoginComponent {
  loginForm!:FormGroup;
  isforgotPasswordClicks:boolean = false;
  // formGroupControl = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),

  // });
  imageVisible = true;
  detailAvailability:boolean = false;

  toggleImage() {
    this.imageVisible == false ? this.imageVisible = true : this.imageVisible = false
  }
 
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService,private empService:EmployeeService) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]],
     

    });
  }
  hide = true;
  fonts:any={
    fontFamily: 'Montserrat,Helvetica, sans-serif',
    textTransform: 'uppercase',
    // backgroundColor:'#f8f8fc',
    fontWeight: 'bold',
    color:"#f8f8fc"
  }
  btn:any = {
    padding:'1rem',
    backgroundColor:'#f8f8fc'
  }
  fontsP:any={
    fontFamily: 'Montserrat,Helvetica, sans-serif',
    textTransform: 'uppercase',
    //backgroundColor:'#f8f8fc',
    color:"#f8f8fc"
  }
  btnB:any={
    padding:'1.3rem',
    backgroundColor:'#f8f8fc',
    borderRadius:'8rem'
  }

  isRegistrationSuccessful = false;
  durationInSeconds = 3; 
  showSuccess(msg:any,body:any){
    this.toastr.success(msg, body, {
   timeOut: 3000,
  });
  }
  
  showErr(msg:any,body:any){
    this.toastr.error(msg, body, {
   timeOut: 3000,
  });
  }

  getDetails(email: string){

    this.empService.getEmployee(email).subscribe({
      next:(resp)=>{
        console.log(resp)
        console.log(this.detailAvailability)
        if(resp!=null){
          this.detailAvailability=!this.detailAvailability;
          console.log(this.detailAvailability)
        }
      }
     })
  }
 

  onsubmit(){

   
    if (this.loginForm.valid) {
      this.authService.generateToken(this.loginForm.value).subscribe(
        {
          next: (data) => {
           
           const payload=this.authService.loginUser(data.token);
           
           
           
           if(payload.authorities==='ROLE_ADMIN'){
             this.router.navigate(['/admindashboard'])  
            }else if(payload.authorities==='ROLE_USER'){

              this.empService.getEmployee(this.loginForm.get('emailId')?.value).subscribe({
                next:(resp)=>{
                  console.log(resp)
                  console.log(this.detailAvailability)
                  if(resp!=null){
                   this.router.navigate(['/empdashboard'])
                  }
                    this.router.navigate(['/profile'])
                  
                },error:(err)=>{
                  this.router.navigate(['/profile'])
                }
               })



          
           }
           
          
          },
          error: (error) => {
            console.log("Error occurred during login:", error.error);
            this.showErr("Error",error.error);
           
          }
        }
      )
    }

  }
  forgotClick(){
    this.isforgotPasswordClicks =!this.isforgotPasswordClicks;
   
  }
}
