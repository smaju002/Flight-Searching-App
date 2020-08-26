import { Component, OnInit } from '@angular/core';
import { FlightsearchService } from '../flightsearch.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Flight } from '../model/flight'


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  departuredate:string;
  departurecity:string;
  arrivalcity:string;
  noofpassenger:number;
  cact:Flight;
  searchflightsData = {
   "departuredate":'',
   "departurecity":'',
   "arrivalcity":'',
   "noofPassengers":''
}
  lstflightdetails: Flight[];
 /* [x: string]: any;
 public collection: any;
 listContact: Flight[]; P/
 /*obj: any = new Flight();
 listContact = this.obj;8 */
 //contList: Array<Flight>;
 //public mapped = Object.keys(this.collection).map(key => ({type: key, value: this.collection[key]}));
 
  /*source: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  allFlights: IflightDetails[];
  filteredFlights: any[];
  flightStatus: boolean = true;
  searchStatus: boolean = false;
  errorMessage: string;  
  sliderValue: number = 0; */

  //sourceList = ["Pune (PNQ)", "Indore (IDR)", "Mumbai (BOM)", "New Delhi (DEL)"];
  //destinationList = ["Mumbai (BOM)", "Indore (IDR)", "Pune (PNQ)", "New Delhi (DEL)"];
  // Form validation
 // flight = new Flight(this.sourceList[0], this.destinationList[0]);
  //sourceValue:string = "Pune (PNQ)";
  //destinationValue:string = "Mumbai (BOM)";
  //valueStatus: boolean = false;
  constructor(private actRt:ActivatedRoute, private flightsearchservice: FlightsearchService, private router: Router) {
   // lstflightdetails: Flight[5];
   }

  ngOnInit(): void {
    //this.getAllFlights();
 
   /* this.loginService.getFlightDetails()
    .subscribe((result)=>{  */
      //  this.contList = result.results;
     //   this.listContact = result;
       // this.collection = result;
       // console.log(" value of origin" + typeof this.collection);
   // })
  }

  trySearch(FlightSearchData){
    console.log(FlightSearchData);
    this.searchflightsData.departuredate=FlightSearchData.departuredate;
    this.searchflightsData.departurecity=FlightSearchData.departurecity;
    this.searchflightsData.arrivalcity=FlightSearchData.arrivalcity;
    this.searchflightsData.noofPassengers=FlightSearchData.noofPassengers;
    console.log(this.searchflightsData);
    this.flightsearchservice.tryFlightSearch(this.searchflightsData)
    .subscribe(
      res => {
        console.log(res)
        this.lstflightdetails = res;
        console.log(this.lstflightdetails)
      },
      err => console.log(err)
    )
  }

  /*priceSearch(id){
    console.log("Enter into priceSearch()");
    this.flightsearchservice.getPriceById(id).subscribe(
      res => {
        console.log(res)
        this.cact = res;
        console.log("cact value " + this.cact)
  },
  err => console.log(err)
    )
  }*/



}
  /*Search(){
    if(this.listContact[1].origin !=""){
      this.listContact = this.listContact.filter(res=>{
        return res.origin.toLocaleLowerCase().match(this.origin.toLocaleLowerCase());
      });
    }
    else if (this.listContact[1].origin == ""){
      this.ngOnInit();
    }
  }

  Search1(){
    if(this.listContact[2].destination !=""){
      this.listContact = this.listContact.filter(res=>{
        return res.destination.toLocaleLowerCase().match(this.destination.toLocaleLowerCase());
      });
    }
    else if (this.listContact[2].destination == ""){
      this.ngOnInit();
    }
  }


  Search2(){
    if(this.departureDate[5].departureDate !=""){
      this.listContact = this.listContact.filter(res=>{
        return res.departureDate.match(this.departureDate);
      });
    }
    else if (this.listContact[5].departureDate == ""){
      this.ngOnInit();
    }
  }*/

/*getAllFlights() {
  this.flightService.getAllFlights().subscribe(
    allFlights => this.allFlights = allFlights,
    error => this.errorMessage = <any>error);
}
onChangeSource(newValue:string){ 
  this.sourceValue = newValue;
  this.compareValue();
 // console.log(newValue);             
}
onChangedestination(newValue:string){ 
  this.destinationValue = newValue;
  this.compareValue();
 // console.log(newValue);           
}
compareValue(){
  if(this.sourceValue == this.destinationValue){
    this.valueStatus = true;
  }else{
    this.valueStatus = false;
  }
}
onSubmit(SearchPara: any) {
  this.flightStatus = false;
  this.source = SearchPara.source;
  this.destination = SearchPara.destination;
  this.startDate = SearchPara.startDate;
  this.endDate = SearchPara.endDate;
  if (this.endDate) {
    this.filteredFlights = this.allFlights.filter((x) => {
      return (x.from_city_id == this.source) &&
        (x.to_city_id == this.destination) &&
        (x.startDate == this.startDate) &&
        (x.endDate == this.endDate)
    });
  } else if(this.startDate) {
    this.filteredFlights = this.allFlights.filter((x) => {
      return ((x.from_city_id == this.source) &&
        (x.to_city_id == this.destination)) &&
        (x.startDate == this.startDate)
    });
  }
  else {
    this.filteredFlights = this.allFlights.filter((x) => {
      return ((x.from_city_id == this.source) &&
        (x.to_city_id == this.destination)) ||
        (x.startDate == this.startDate)
    });
  }
  if(this.filteredFlights.length == 0){
    this.searchStatus = true;
  }else{ 
    this.searchStatus = false;
  }
  // console.log("Ok..."+ this.filteredFlights.length)
}
}*/
