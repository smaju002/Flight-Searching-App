import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    username: '' ,
    pass: ''
  }
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  /*tryLogin(loginData){
    console.log("Welcome to login page!");

    console.log(loginData)

    this.loginService.tryLogin(loginData.username, loginData.pass).subscribe(response => {
        if(response){
          console.log(response)
          this.loginStatus = 1
          setTimeout(() => {
            this.router.navigate(['homepage'])
          }, 2000);
        }
        else {
          console.log("Giriş Başarısız")
        }
      }, error => {
        if(error){
          this.loginStatus = 2
          console.log(error.error)
          setTimeout(() => {
            this.loginStatus = 0
          }, 2000);
        }

      }

      )

  }*/


  loginUser(){
    console.log("Welcome to the Login Screen!!!")
    console.log(this.loginUserData.username);
    console.log(this.loginUserData.pass);
   /* this.loginService.loginUser(this.loginUserData)
   .subscribe(
     (res) => {
      localStorage.setItem('token', res.token)  //for auth guard
       console.log(res)
       console.log("This is for Testing" + res.isValid);
       if(res.isValid == 'True')
       {
       this.router.navigate(['homepage'])
       }
       else{
         alert("Wrong Username or Password!!!");
       }
     },
     err => console.log(err)
   ) */


   this.loginService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        if (res.token === undefined){
        window.alert("Provide valid username/password")
        this.router.navigate(['/login'])
        }
        else{
        localStorage.setItem('token', res.token)
        this.router.navigate(['/homepage'])
        }
      },
      err => console.log(err)
    )
  }


} 
