import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {
  employees: any;
  imageSrcMap: { [email: string]: any } = {};


  constructor(private empService: EmployeeService,private sanitizer: DomSanitizer) {}

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
  // convertImages(employees: any[]): void {
  //   employees.forEach(employee => {
  //     console.log('Original image data:', employee.img);
  //     const imageBlob = new Blob([employee.img]); 
  //     const imageUrl = URL.createObjectURL(imageBlob);
  //     console.log(imageBlob);
  //     console.log(imageUrl)
      
  //     employee.img = imageUrl; 
  //   });
  // }

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
