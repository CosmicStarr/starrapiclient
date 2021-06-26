import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountServicesService } from '../_Services/account-services.service';
import { IUser } from '../_Models/User';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private AccountService:AccountServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let CurrentUser:IUser;
    this.AccountService.CurrentUser$.pipe(take(1)).subscribe(results => CurrentUser = results);
    if(CurrentUser){
      request = request.clone({
        setHeaders:{
          authorization:`Bearer ${CurrentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
