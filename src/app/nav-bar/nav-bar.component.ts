import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../_Models/User';
import { AccountServicesService } from '../_Services/account-services.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  model:any = {};

  constructor(public AccountService:AccountServicesService) { }

  ngOnInit(): void {
   this.AccountService.CurrentUser$;
  }

  Login(){
   this.AccountService.Login(this.model).subscribe(result =>{
      console.log(result);
   },error => {
     console.log(error);
   });
  }

  LogOut(){
    this.AccountService.LogOut();
  }

}
