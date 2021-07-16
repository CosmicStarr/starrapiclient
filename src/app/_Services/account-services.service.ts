import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { IUser } from '../_Models/User';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {
  baseUrl = environment.baseUrl;
  private CurrentUserSource = new ReplaySubject<IUser>(1);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  constructor(private Http:HttpClient) { }

  Login(model:any){
    return this.Http.post(this.baseUrl + 'account/login', model).pipe(
      map((results:IUser) =>{
        const User = results;
        if(User){
          this.SetCurrentUser(User);
        }
      })
    );
  }

  registerUser(model:any){
    return this.Http.post(this.baseUrl + "account/register", model).pipe(
      map((User:IUser) =>{
        if(User){
          this.SetCurrentUser(User);        
        }
      })
    );
  }
  
  SetCurrentUser(user:IUser){
    user.roles = [];
    const roles = this.getdecodedtoken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user))
    this.CurrentUserSource.next(user);
  }

  LogOut(){
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }

  getdecodedtoken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
