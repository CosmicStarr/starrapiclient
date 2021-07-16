import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountServicesService } from '../_Services/account-services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  Title = "Wrong Turn!";

  constructor(private accountService:AccountServicesService, private toastr:ToastrService) {

  }

  canActivate(): Observable<boolean> {
    return this.accountService.CurrentUser$.pipe(
      map(user =>{
        if(user.roles.includes('Admin') || user.roles.includes('Manager')){
          return true;
        }
        this.toastr.error('You are not allowed here!',this.Title);
      })
    )
  }
  
}
