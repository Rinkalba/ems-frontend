import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8091/user/user';
  constructor(private http:HttpClient) { }

  register(file:File,emp:any){
    const formData: FormData = new FormData();
    formData.append('file', file); 
    formData.append('user-info', JSON.stringify(emp)); 
    return this.http.post(`${this.baseUrl}/register`, formData,{responseType:'text'});

  }
  // register() {
  //   return this.http.post(`${this.baseUrl}/register?user-info=${JSON.stringify(stuDto)}`, null);
  // }

  getAllEmployes(){
    return this.http.get(`${this.baseUrl}/getAllUsers`,{responseType:'json'});
  }

  getImg(email:string){
    return this.http.get(`${this.baseUrl}/getImg/${email}`,{responseType:'blob'});
  }

  getEmployee(email:string){
    return this.http.get(`${this.baseUrl}/getEmployee/${email}`,{responseType:'json'});
  }

  updateEmployee(email:string,file:File,emp:any){
    const formData: FormData = new FormData();
    formData.append('file', file); 
    formData.append('user-info', JSON.stringify(emp)); 
    return this.http.post(`${this.baseUrl}/updateUser/${email}`,formData,{responseType:'text'});
  }

  deleteEmployee(email:string){
    return this.http.post(`${this.baseUrl}/deleteUser/${email}`,{responseType:'text'});
  }
  
  
}
