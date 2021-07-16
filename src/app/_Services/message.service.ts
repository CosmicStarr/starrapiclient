import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMessages } from '../_Models/Messages';
import { getPagination, newMethod } from './PaginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  BaseUrl = environment.baseUrl;
  constructor(private Http:HttpClient) { }

  getMessages(pageNumber,pageSize,container){
    let params = getPagination(pageNumber,pageSize);
    params = params.append('Container',container);
    return newMethod<IMessages[]>(this.BaseUrl + 'Messages',params,this.Http);
  }

  getMessageThread(username:string){
    return this.Http.get<IMessages[]>(this.BaseUrl + 'Messages/thread/' + username);
  }

  sendMessage(username:string, content:string){
    return this.Http.post<IMessages>(this.BaseUrl + 'Messages', {RecipientUsername: username, content});
  }

  deleteMSG(Id:number):Observable<void>{
    return this.Http.delete<void>(this.BaseUrl + 'Messages/'+ Id);
  }
}
