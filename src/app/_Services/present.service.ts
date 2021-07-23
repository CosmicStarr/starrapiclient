import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
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
  constructor(private toastr:ToastrService,private router:Router) { }

  createHubConnection(User:IUser){
    this.hubConnect = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'presenthub',{
      accessTokenFactory: ()=> User.token
    })
    .withAutomaticReconnect()
    .build()

    this.hubConnect.start().catch(error => console.log(error));

    this.hubConnect.on('UserIsOnline', username =>{
      this.onlineUsers$.pipe(take(1)).subscribe(results => {
        this.onlineUserSource.next([...results,username])
      })
    })

    this.hubConnect.on('UserIsOffline', username =>{
      this.onlineUsers$.pipe(take(1)).subscribe(results => {
        this.onlineUserSource.next([...results.filter(f => f !== username)])
      })
    })

    this.hubConnect.on('GetOnlineUsers', (usernames: string[])=>{
      this.onlineUserSource.next(usernames);
    })

    this.hubConnect.on('NewMessageReceived',({username,alsoknowas}) =>{
      this.toastr.info(alsoknowas + ' Has sent you a message!')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'))
    })
  }

  stopConnection(){
    this.hubConnect.stop().catch(error => console.log(error));
  }
}
