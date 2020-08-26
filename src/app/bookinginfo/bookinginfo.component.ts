import { Component, OnInit } from '@angular/core';
import { BookingdetailsretrievalService } from '../bookingdetailsretrieval.service'
import { Router } from '@angular/router'
import { Bookingdetails } from '../model/bookingdetails'

@Component({
  selector: 'app-bookinginfo',
  templateUrl: './bookinginfo.component.html',
  styleUrls: ['./bookinginfo.component.css']
})
export class BookinginfoComponent implements OnInit {
  lstbookingdetails:Bookingdetails[];
  constructor(private bookingdetailsretrieval:BookingdetailsretrievalService,private router:Router) {}

  ngOnInit(): void {
    this.bookingdetailsretrieval.getbookingdetails()
      .subscribe(
        res => {
          console.log(res)
          this.lstbookingdetails = res;
          console.log("Printing"+this.lstbookingdetails)
          console.log(this.lstbookingdetails)
        },
        err => console.log(err)
      )
  }

}
