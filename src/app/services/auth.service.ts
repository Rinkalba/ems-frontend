import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:8092/auth/auth';


 constructor(private http: HttpClient) { }

 register(userData: any): Observable<any> {
   return this.http.post<any>(`${this.baseUrl}/register`, userData);
 }

 generateToken(userData: any): Observable<any> {
   return this.http.post<any>(`${this.baseUrl}/login`, userData);
 }

 getId(username:any){
   return this.http.get<any>(`${this.baseUrl}/getId/${username}`,{responseType: 'text' as 'json'});
 }

 //for login User
 loginUser(token: any) {
   localStorage.setItem("token", token);
   const decodedData: any = jwtDecode(token);
   const username = decodedData.user_name;
   //console.log(decodedData.authorities)
   const authorities = decodedData.authorities[0]; // Extracting authorities from token payload
   const payload = { username, authorities }; // Creating payload object
   localStorage.setItem('username', username);
   localStorage.setItem('role', authorities);
   return payload;
 }
 

 //if token is their or not
 isLoggedIn(): boolean {
   const token = localStorage.getItem('token');
   if (token==undefined || token==='' || token==null) {
     return false;
   } else {
     
     return true;
   }
 }

 //for logout
 logout(){
   localStorage.removeItem('token');
   localStorage.removeItem('role');
   localStorage.removeItem('username');
 
 }

 //for getting token
 getToken() {
   return localStorage.getItem('token');
 }


 verifyUsername(username:any){
   return this.http.get<Boolean>(`${this.baseUrl}/verifyUsername/${username}`);
 }
 

}
