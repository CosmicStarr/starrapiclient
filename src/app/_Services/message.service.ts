import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IGroups } from '../_Models/Groups';
import { IMessages } from '../_Models/Messages';
import { IUser } from '../_Models/User';
import { getPagination, newMethod } from './PaginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  HubUrl = environment.HubUrl;
  BaseUrl = environment.baseUrl;
  private HubConnection:HubConnection;
  private MessageThreadSource = new BehaviorSubject<IMessages[]>([]);
  messageThread$ = this.MessageThreadSource.asObservable();


  constructor(private Http:HttpClient) { }

  createHubConnection(user:IUser,otherUser:string){
    this.HubConnection = new HubConnectionBuilder()
    .withUrl(this.HubUrl + 'messages?user=' + otherUser,{
      accessTokenFactory: () => user.token
    })
    .withAutomaticReconnect()
    .build()

    this.HubConnection.start().catch(error => console.log(error));

    this.HubConnection.on('ReceiveMessageThread', msg =>{
      this.MessageThreadSource.next(msg);
    })

    this.HubConnection.on('NewMessage',msg =>{
      this.messageThread$.pipe(take(1)).subscribe(results =>{
        this.MessageThreadSource.next([...results,msg]);
      })
    })

    this.HubConnection.on('UpdateGroup', (group:IGroups) =>{
      if(group.connections.some(x => x.username === otherUser)){
        this.messageThread$.pipe(take(1)).subscribe(results =>{
          results.forEach(item =>{
            if(!item.dateRead){
              item.dateRead = new Date(Date.now())
            }
          })
          this.MessageThreadSource.next([...results])
        })
      }
    })
  }

  stopConnection(){
    if(this.HubConnection){
      this.HubConnection.stop();
    }
  }

  getMessages(pageNumber,pageSize,container){
    let params = getPagination(pageNumber,pageSize);
    params = params.append('Container',container);
    return newMethod<IMessages[]>(this.BaseUrl + 'Messages',params,this.Http);
  }

  getMessageThread(username:string){
    return this.Http.get<IMessages[]>(this.BaseUrl + 'Messages/thread/' + username);
  }

  async sendMessage(username:string, content:string){
      return this.HubConnection.invoke('SendMessages',{RecipientUsername: username, content})
      .catch(error => console.log(error)); 
  }

  deleteMSG(Id:number):Observable<void>{
    return this.Http.delete<void>(this.BaseUrl + 'Messages/'+ Id);
  }
}
