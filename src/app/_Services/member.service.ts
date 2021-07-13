import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../_Models/Member';
import { IUser } from '../_Models/User';
import { UserParam } from '../_Models/UserParams';
import { AccountServicesService } from './account-services.service';
import { getPagination, newMethod } from './PaginationHelper';



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
  MemberCache = new Map();
  user:IUser;
  userParams:UserParam;
  
  constructor(private Http:HttpClient, private AccountService:AccountServicesService) {
    this.AccountService.CurrentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
      this.userParams = new UserParam(response);
    })
   }

  getUserParams(){
    return this.userParams;
  }

  addLike(username:string){
    return this.Http.post(this.baseUrl + 'Likes/' + username, {});
  }

  getLikes(predicate:string,pageNumber:number,pageSize:number){
    let Params = getPagination(pageNumber,pageSize);
    Params = Params.append('predicate',predicate);
    return newMethod<Partial<IMember[]>>(this.baseUrl + 'Likes', Params, this.Http);
  }

  setUserParams(params:UserParam){
    this.userParams = params;
  }
  
  resetUserParams(){
    this.userParams = new UserParam(this.user);
    return this.userParams;
  }

  getMembers(userParams:UserParam){
    var response = this.MemberCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPagination(userParams.pageNumber,userParams.pageSize);
    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('orderBy',userParams.orderBy);
    params = params.append('gender',userParams.gender);
    return newMethod<IMember[]>(this.baseUrl + 'Users' ,params,this.Http)
    .pipe(map(response =>{
      this.MemberCache.set(Object.values(userParams).join('-'),response)
       return response;
    }));
  }



  getMember(Username: string){
    const Member = [...this.MemberCache.values()]
    .reduce((array,elements)=> array.concat(elements.results),[])
    .find((member:IMember) => member.username === Username);
    console.log(Member);
    if(Member){
      return of(Member);
    }

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