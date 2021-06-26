import { Component, OnInit } from '@angular/core';
import { IUser } from './_Models/User';
import { AccountServicesService } from './_Services/account-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'StarrClient';
 
  

  constructor(private AccountService:AccountServicesService) { 
  }

  ngOnInit() {
    this.SetCurrentUsers();
  }

  SetCurrentUsers(){
    const User : IUser = JSON.parse(localStorage.getItem('user'));
    this.AccountService.SetCurrentUser(User);
  }

}
