import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit  {
  personalDg: FormGroup;
  educationDg: FormGroup;
  experienceDg: FormGroup;

  details:any;
  emailId:any;

  
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.emailId=this.route.snapshot.params['emailId'];
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
  ngOnInit(): void {
    this.empService.getEmployee(this.emailId).subscribe({
      next: (resp) => {
        // Set the form values
        this.personalDg.patchValue(resp);
        this.educationDg.patchValue(resp);
        this.experienceDg.patchValue(resp);
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  isSubmitEnabled(): boolean {
    return this.personalDg.valid && this.educationDg.valid && this.experienceDg.valid;
  }

  // constructor(
    
  //   private fb: FormBuilder,
  //   private empService: EmployeeService,
  //   private router: Router,
  //   private toastr: ToastrService,
  //   private route: ActivatedRoute,
    
  // ) {
  //   this.emailId=this.route.snapshot.params['emailId'];
    
  //   this.personalDg = this.fb.group({
  //     emailId: [{value: this.emailId, disabled: true}],
  //     fullName: [''],
  //     dob: [''],
  //     contact: [''],
  //     address: [''],
  //     profileImg: [null],
  //     branch: [''],
  //     yop: [''],
  //     cgpa: [''],
  //     exp: [''],
  //     company: [''],
  //     designation: ['']
  //   });

   
  // }

 

  onsubmit() {
   
      
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
      
     
      
      this.empService.updateEmployee(this.emailId,file,stuDto).subscribe({
        next:(resp)=>{
          console.log(resp)
          if(resp==='User Updated Succesfully!'){
            this.showSuccess('Successfully Updated all details', 'Welcome!');
            if(localStorage.getItem('role')==='ROLE_USER'){
              this.router.navigate(['/full-details',this.emailId]);
            }else{
              this.router.navigate(['/full-details',this.emailId]);
            }
          }
        },
        error:(err)=>{
          console.log(err);
          this.showErr(err.error.message, 'Something went wrong!!');
        }
      })


  
    
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
