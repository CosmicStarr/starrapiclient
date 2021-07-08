import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, retry, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../_Models/Member';
import { paginatedResults } from '../_Models/Pagination';
import { IUser } from '../_Models/User';
import { UserParam } from '../_Models/UserParams';
import { AccountServicesService } from './account-services.service';



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
    let Params = this.getPagination(pageNumber,pageSize);
    Params = Params.append('predicate',predicate);
    return this.newMethod<Partial<IMember[]>>(this.baseUrl + 'Likes', Params);
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
    let params = this.getPagination(userParams.pageNumber,userParams.pageSize);
    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('orderBy',userParams.orderBy);
    params = params.append('gender',userParams.gender);
    return this.newMethod<IMember[]>(this.baseUrl + 'Users' ,params)
    .pipe(map(response =>{
      this.MemberCache.set(Object.values(userParams).join('-'),response)
       return response;
    }));
  }

  private newMethod<T>(Url: string,params: HttpParams) {
    const PaginationResults: paginatedResults<T> = new paginatedResults<T>();
    return this.Http.get<T>(Url,{ observe: 'response', params }).pipe(
      map(response => {
        PaginationResults.results = response.body;
        if (response.headers.get('pagination') !== null) {
          PaginationResults.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return PaginationResults;
      })
    );
  }

  private getPagination(pageNumber:number,pageSize:number){
    let params = new HttpParams();
      params.append('pageNumber', pageNumber.toString());
      params.append('pageSize', pageSize.toString());

      return params;
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