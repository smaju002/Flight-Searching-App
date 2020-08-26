import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Flight } from './model/flight'

@Injectable(
  {
  providedIn: 'root'
}
)
export class LoginService {
 // private url = "http://localhost:5454/login"
  private _loginUrl = "http://localhost:5454/login";
  private searchUrl = "http://localhost:5454/flights"
  constructor(private http: HttpClient, private router:Router) {}

  /*tryLogin(username: any, password: any){
    console.log("inside tryLogin!!")
    console.log(this.url);
    const loginDto = {

      'username' : username,

      'pass' : password

    }
    console.log("after loginDto!!!")
    console.log(loginDto)
    console.log(this.url)
    //return this.http.post(this.url, loginDto)
    console.log(this.http.get(this.url)); 
    return this.http.get(this.url)

  }*/

  loginUser(user): Observable<any>{
   return this.http.post<any>(this._loginUrl, user)
  }
  //auth guard
  loggedIn() {
    //console.log("Testing for Auth Guard!!")
    //console.log("Again for Testing" + localStorage.getItem('token'))
    return !!localStorage.getItem('token')    
  }
  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

 /* getFlightDetails(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.searchUrl);
  } */



}
