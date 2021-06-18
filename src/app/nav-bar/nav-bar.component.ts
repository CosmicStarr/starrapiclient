import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountServicesService } from '../_Services/account-services.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  model:any = {};

  constructor(public AccountService:AccountServicesService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
   this.AccountService.CurrentUser$;
  }

  Login(){
   this.AccountService.Login(this.model).subscribe(result =>{
      this.router.navigateByUrl('/members')
      console.log(result);
   },error => {
     console.log(error);
     this.toastr.error(error.error);
   });
  }

  LogOut(){
    this.AccountService.LogOut();
    this.router.navigateByUrl('/');
  }

}
