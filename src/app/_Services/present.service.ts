import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../_Models/User';


@Injectable({
  providedIn: 'root'
})
export class PresentService {
  hubUrl = environment.HubUrl;
  private hubConnect:HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUserSource.asObservable();
  constructor(private toastr:ToastrService) { }

  createHubConnection(User:IUser){
    this.hubConnect = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'presenthub',{
      accessTokenFactory: ()=> User.token
    })
    .withAutomaticReconnect()
    .build()

    this.hubConnect.start().catch(error => console.log(error));

    this.hubConnect.on('UserIsOnline', username =>{
      this.toastr.info(username + ' is Online');
    })

    this.hubConnect.on('UserIsOffline', username =>{
      this.toastr.warning(username + ' is Offline');
    })

    this.hubConnect.on('GetOnlineUsers', (usernames: string[])=>{
      this.onlineUserSource.next(usernames);
    })
  }

  stopConnection(){
    this.hubConnect.stop().catch(error => console.log(error));
  }
}
