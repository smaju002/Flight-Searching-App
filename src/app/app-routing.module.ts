import { NgModule,Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { BookComponent } from './book/book.component';
import { BookinginfoComponent } from './bookinginfo/bookinginfo.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'book/:id', component: BookComponent, canActivate: [AuthGuard]},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path:'book-page',component:BookinginfoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
