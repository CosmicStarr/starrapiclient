import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  Members:IMember[] = [];
  constructor(private Http:HttpClient) { }

  getMembers(){
    if(this.Members.length > 0) return of(this.Members);
    return this.Http.get<IMember[]>(this.baseUrl + 'Users').pipe(
      map(results =>{
        this.Members = results;
        return results;
      })
    );
  }

  getMember(Username:string){
    const Member = this.Members.find(m=>m.username === Username);
    if(Member !== undefined) return of(Member);
    return this.Http.get<IMember>(this.baseUrl + 'Users/' + Username);
  }

  updateMember(Member:IMember){
    return this.Http.put(this.baseUrl + 'Users', Member).pipe(
      map(() => {
        const Index = this.Members.indexOf(Member);
        this.Members[Index] = Member;
      })
    );
  }

  setMainPhoto(photoId:number){
    return this.Http.put(this.baseUrl + 'Users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId:number){
    return this.Http.delete(this.baseUrl +'Users/delete-Photo/' + photoId)
  }

}