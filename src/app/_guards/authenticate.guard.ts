import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountServicesService } from '../_Services/account-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  constructor(private AccoutService:AccountServicesService, private Toastr:ToastrService) {
  }
  canActivate(): Observable<boolean>  {
    return this.AccoutService.CurrentUser$.pipe(
      map(User =>{
        if(User) return true;
        this.Toastr.error('Your not welcome here!');
      })
    )
  }
  
}
