import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../_Models/Member';


const HttpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.baseUrl;
  constructor(private Http:HttpClient) { }

  getMembers(){
    return this.Http.get<IMember[]>(this.baseUrl + 'Users'); 
  }

  getMember(Username:string){
    return this.Http.get<IMember>(this.baseUrl + 'Users/' + Username);
  }
}