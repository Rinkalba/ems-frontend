import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent  {
  employees: any;
  imageSrcMap: { [email: string]: any } = {};

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.getAllEmployes().subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data;
        this.employees.forEach((e: any) => {
          console.log(e.emailId)
          this.convertImages(e.emailId)
         });
       
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
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
}
