import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  personalDg: FormGroup;
  educationDg: FormGroup;
  experienceDg: FormGroup;

  details:any;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.personalDg = this.fb.group({
      emailId: [localStorage.getItem("username")],
      fullName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      address: ['', [Validators.required]],
      profileImg: [null, [Validators.required]]
    });

    this.educationDg = this.fb.group({
      branch: ['', Validators.required],
      yop: ['', Validators.required],
      cgpa: ['', Validators.required]
    });

    this.experienceDg = this.fb.group({
      exp: ['', [Validators.required]],
      company: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });
  }

  isSubmitEnabled(): boolean {
    return this.personalDg.valid && this.educationDg.valid && this.experienceDg.valid;
  }

  onsubmit() {
    if (this.isSubmitEnabled()) {
      const personalData = this.personalDg.value;
      const educationData = this.educationDg.value;
      const experienceData = this.experienceDg.value;
      const file:File = this.personalDg.get('profileImg')?.value;
      console.log(file)
      
      const stuDto={
        emailId: personalData.emailId,
        fullName: personalData.fullName,
        dob: personalData.dob,
        contact: personalData.contact,
        address: personalData.address,
        branch: educationData.branch,
        yop: educationData.yop,
        cgpa: educationData.cgpa,
        exp: experienceData.exp,
        company: experienceData.company,
        designation: experienceData.designation,
        //profileImg: file
      }
      
      this.empService.register(file,stuDto).subscribe({
        next:(resp)=>{
          if(resp==='Registered!'){
            this.showSuccess('Successfully Registered all details', 'Welcome!');
            if(localStorage.getItem('role')==='ROLE_USER'){
              this.router.navigate(['/empdashboard']);
            }else{
              this.router.navigate(['/admindashboard']);
            }
          }
        },
        error:(err)=>{
          console.log(err);
          this.showErr(err.error.message, 'Something went wrong!!');
        }
      })


  
    } 
  }
  
  

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personalDg.get('profileImg')?.setValue(file);
    }
  }
  

  // Function to trigger file input click
  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  showSuccess(msg: any, body: any) {
    this.toastr.success(msg, body, { timeOut: 3000 });
  }

  showErr(msg: any, body: any) {
    this.toastr.error(msg, body, { timeOut: 3000 });
  }
  
}
