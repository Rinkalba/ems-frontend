import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-fulldetails',
  templateUrl: './fulldetails.component.html',
  styleUrls: ['./fulldetails.component.css']
})
export class FulldetailsComponent implements OnInit  {
  imageSrcMap: { [email: string]: any } = {};
  employee:any;
  emailId!:string;
  rolee!:any;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {

    this.step++;
  }

  prevStep() {
    this.step--;
  }

  
  constructor(private route:ActivatedRoute,private empService:EmployeeService,private router:Router, private toastr: ToastrService) {
    this.emailId=this.route.snapshot.params['emailId'];
    this.rolee=localStorage.getItem('role');
    console.log(this.rolee);
  }
  
  ngOnInit(): void {
    console.log(this.emailId);
    this.empService.getEmployee(this.emailId).subscribe({
      next:(data)=>{
        this.employee=data;
        this.convertImages(this.emailId)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  convertImages(email:string) {
    this.empService.getImg(email).subscribe({
      next: (res) => {
        console.log(res)
        const objectURL = URL.createObjectURL(res);
        console.log(objectURL)
        this.imageSrcMap[email] = objectURL; 
      },
      error: (err) => {
        alert(`Error fetching image for ${email}:` + err);
      },
    });

}

editUser(){
  this.router.navigate(['/update-profile',this.emailId]);
}
showSuccess(msg: any, body: any) {
  this.toastr.success(msg, body, { timeOut: 3000 });
}

showErr(msg: any, body: any) {
  this.toastr.error(msg, body, { timeOut: 3000 });
}

deleteEmployee(){
  this.empService.deleteEmployee(this.emailId).subscribe({
    next:(resp)=>{
      console.log(resp)
      if(resp){
        this.showSuccess("User Deleted Successfully!",'welcome back!');
        this.router.navigate(['/admindashboard'])
      }
    },
    error:(err)=>{
      this.showErr("Something went wrong", err);
    }
  })
}
}
