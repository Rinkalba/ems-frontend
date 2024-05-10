import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn=false;
  role:string ='';
  constructor(private loginsrvice:AuthService,private route:Router) { }
  ngOnInit(): void {
    
    this.loggedIn=this.loginsrvice.isLoggedIn();
    console.log(this.loggedIn);
    this.role = localStorage.getItem('role') ?? '';

  }

  profileUser(){
    this.route.navigate(['/userForm']);
  }
  profileAdmin(){
    this.route.navigate(['/adminForm']);
  }

  logoutUser(){

    this.loginsrvice.logout();
    location.reload();
    this.loggedIn=!this.loggedIn;
  }
  logo={
    
    'height': '30%',
  }
  anyData:any=10;

}
