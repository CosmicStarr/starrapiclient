import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../_Models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getUsersWithRoles(){
   return this.http.get<Partial<IUser[]>>(this.baseUrl + 'Admin/users-with-roles');
  }

  updateUserRoles(username:string,roles:string[]){
    return this.http.post(this.baseUrl + 'Admin/edit-roles/' + username + '?roles=' + roles, {});
  }
}
