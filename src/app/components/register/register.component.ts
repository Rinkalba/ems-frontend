import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('800ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('600ms ease-out', style({ transform: 'translateX(100%)' })),
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('500ms ease-out', style({ transform: 'translateX(-100%)' })),
      ])
    ]),
  ],
  
})
export class RegisterComponent{


  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // passwordControl = new FormControl('', [Validators.required]);
  // usernameControl = new FormControl('', [Validators.required]);

  loginForm!: FormGroup;
  imageVisible = true;

  toggleImage() {
    this.imageVisible == false ? this.imageVisible = true : this.imageVisible = false
  }
 isExisting:boolean = true;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr: ToastrService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
    
      emailId: ['', [Validators.required, Validators.email,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      name: ['', [Validators.required,Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]],

    });

   
  }

  hide = true;
  fonts:any={
    fontFamily: 'Montserrat,Helvetica, sans-serif',
    textTransform: 'uppercase',
    //backgroundColor:'#f8f8fc',
    fontWeight: 'bold',
    color:"#f8f8fc"
  }
  fontsP:any={
    fontFamily: 'Montserrat,Helvetica, sans-serif',
    textTransform: 'uppercase',
    //backgroundColor:'#f8f8fc',
    color:"#f8f8fc"
  }
  btn:any = {
    padding:'1.3rem',
    backgroundColor:'#f8f8fc',
    borderRadius:'8rem'
  }
  btnB:any={
    padding:'1.3rem',
    backgroundColor:'#f8f8fc',
    borderRadius:'8rem'
  }

isRegistrationSuccessful = false;
durationInSeconds = 3; 

// openSnackBar() {
//   if(this.isRegistrationSuccessful){
//     this.snackBar.open('Registerd Successfully!', 'Dismiss', {
//       duration: this.durationInSeconds * 1000,
//     });

//   }else{
//     this.snackBar.open('Registration Failed!', 'Dismiss', {
//       duration: this.durationInSeconds * 1000,
//     });
//   }
// }

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

onsubmit() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value).subscribe({
        next: (data) => {
          if (data) {
            console.log(data)
            console.log("Registration successful");
            this.isRegistrationSuccessful = true; 
            // this.openSnackBar();
            this.showSuccess("Registration successful","Now You can Login!");
            this.router.navigate(['/login']);
          } else {
            // this.openSnackBar();
            this.showErr("Registration Failed","Try agian!");
            console.log("Registration failed!Try Again!");
           
          }
        },
        error: (error) => {
          this.showErr("Error occurred during registration:",error);
          console.log("Error occurred during registration:", error);
          
        }
      });
    }
  }
  
 
  
}
