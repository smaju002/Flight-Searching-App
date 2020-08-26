import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { FlightsearchService } from '../flightsearch.service';
import { Flight } from '../model/flight';
import { User } from '../model/user';
import { BookconfirmService } from '../bookconfirm.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
/* id: any;
 flightnumber:string;
 cact:Flight;
 booking:boolean = false; */
lstflights:[];
//lstflights: Flight;
bookings:User[];
pnr:String;


 /*userData = {
   "flightnumber":'',
  "userEmail":'',
  "userMobile":'',
  "userAddress":'',
  "userTitle":'',
  "userName":'',
  "pnrNumber": "PNR"+ Math.floor(Math.random() * 10000000000) +1 

}*/

searchflightsData = {
  "departuredate":'',
  "departurecity":'',
  "arrivalcity":'',
  "noofPassengers":''
}

userDetails: User[];

  constructor(private actRt:ActivatedRoute,private bookconfirmservice:BookconfirmService,private flightsearchservice: FlightsearchService,private router: Router) { }

  ngOnInit(): void {
    //this.id =this.actRt.snapshot.params['id'];
    //console.log("checking for ID "+this.id);
    const id = this.actRt.snapshot.paramMap.get('id');
    //const id = this.actRt.snapshot.params['id'];
    this.flightsearchservice.getById(id)
    .subscribe(
     (res) => {
    console.log(res)
    this.lstflights = res
    console.log("Printing" + this.lstflights);
    console.log(this.lstflights)
      },
      err => console.log(err)
    )}
    confirmbook(bookingdata){
      console.log("Booking Data")
      console.log(bookingdata)
      this.bookconfirmservice.confirmbooking(bookingdata)
      .subscribe(
        res => {
          console.log(res)
          this.pnr = res;
          console.log("Printing"+this.pnr)
          window.alert("PNR Number is :" +res.pnr);
          this.router.navigate(['/book-page'])
        },
        err => console.log(err)
      )} 
    }




    /*this.getById();
    console.log("After function call" + this.booking)
  }
  getById(){
    console.log("Inside book.compo")
  this.flightsearchservice.getById(this.id).subscribe((data)=>{
     console.log(data);
     this.cact=data;

  })
  }*/

 /* addUser(FlightSearchData){
    console.log(FlightSearchData);
    this.userData.userEmail=FlightSearchData.userEmail;
    this.userData.userMobile=FlightSearchData.userMobile;
    this.userData.userAddress=FlightSearchData.userAddress;
    this.userData.userTitle=FlightSearchData.userTitle;
    this.userData.userName=FlightSearchData.userName;
    console.log(this.userData.pnrNumber);
    this.userData.flightnumber=this.flightnumber;
    console.log(this.userData.flightnumber);
    this.flightsearchservice.addUserDetails(this.userData).subscribe((resp)=>{
      console.log("response for testing"+resp);
      this.userDetails = resp;
      console.log(this.userDetails);
      window.alert("PNR number for this booking is: " + this.userData.pnrNumber);
    },
    err => console.log(err)
    )
  }

}*/
