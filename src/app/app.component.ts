import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { FlightsearchService } from './flightsearch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing';
  constructor(public loginService: LoginService,public flightsearchService: FlightsearchService){}
}
