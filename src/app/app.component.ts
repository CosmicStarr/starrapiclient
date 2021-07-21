import { Component, OnInit } from '@angular/core';
import { IUser } from './_Models/User';
import { AccountServicesService } from './_Services/account-services.service';
import { PresentService } from './_Services/present.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'StarrClient';
 
  

  constructor(private AccountService:AccountServicesService, private present:PresentService) { 
  }

  ngOnInit() {
    this.SetCurrentUsers();
  }

  SetCurrentUsers(){
    const User : IUser = JSON.parse(localStorage.getItem('user'));
    if(User){
      this.AccountService.SetCurrentUser(User);
      this.present.createHubConnection(User);
    }
   
  }

}
