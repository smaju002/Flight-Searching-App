import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Flight } from './model/flight';



@Injectable({
  providedIn: 'root'
})
export class FlightsearchService {

  private flightUrl:string;
  //private bookingUrl: string;
  constructor(private http: HttpClient, private router:Router) { 
    this.flightUrl = "http://localhost:5454/dashboard-page";
    //this.bookingUrl = "http://localhost:5454/book-page";
  }

  tryFlightSearch(UserFlightSearch): Observable<any>{

    console.log(UserFlightSearch.departuredate)
    console.log(UserFlightSearch.departurecity)

    return this.http.post<any>(this.flightUrl,UserFlightSearch)
  }

  getById(id: string): Observable<any>{
    console.log("Inside Service")
    return this.http.get<any>(`${this.flightUrl}/${id}`)

  }

 /* addUserDetails(UserFlightSearch): Observable<any> {
    console.log("Inside addUserDetails() Service");
    console.log(UserFlightSearch.userEmail);
    return this.http.post<any>(this.bookingUrl,UserFlightSearch);

  }*/

 /* addUserDetails(user: User): Observable<Response> {
    console.log("Inside addUserDetails() Service");
    console.log(this.http.post<Response>(this.bookingUrl, user));
    return this.http.post<Response>(this.bookingUrl,user);

  }*/



}
