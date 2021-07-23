import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';

import { IMember } from 'src/app/_Models/Member';
import { IMessages } from 'src/app/_Models/Messages';
import { IUser } from 'src/app/_Models/User';
import { AccountServicesService } from 'src/app/_Services/account-services.service';
import { MemberService } from 'src/app/_Services/member.service';
import { MessageService } from 'src/app/_Services/message.service';
import { PresentService } from 'src/app/_Services/present.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('tabs',{static:true}) tabs: TabsetComponent;
  activeTab: TabDirective;
  message:IMessages[] = [];
  member:IMember;
  user:IUser;
  galleryOptions:NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];
  constructor(public present:PresentService 
    ,private route:ActivatedRoute
    ,private router:Router
    ,private MessageService:MessageService, private accountService:AccountServicesService) {
      this.accountService.CurrentUser$.pipe(take(1)).subscribe(results =>{
        this.user = results
      })
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }


  ngOnInit(): void {
    this.route.data.subscribe(results => {
      this.member = results.member
    })
    this.route.queryParams.subscribe(results =>{
      results.tab ? this.setActiveTab(results.tab) : this.setActiveTab(0);
    })
    this.galleryOptions = [
      {
        width:'500',
        height:'500',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Rotate,
        preview:false
      }
    ]
    this.galleryImages = this.GetImages();
  }

  GetImages():NgxGalleryImage[]{
    const ImageUrls = [];
    for(const item of this.member.photos){
      ImageUrls.push({
          small:item?.photoUrl,
          medium:item?.photoUrl,
          big:item?.photoUrl
        })
    }
    return ImageUrls;
  }

  LoadMessages(){
    this.MessageService.getMessageThread(this.member.username).subscribe(results =>{
      this.message = results;
    })
  }

  setActiveTab(tabsId:number){
    this.tabs.tabs[tabsId].active = true;
  }

  onTabActive(data:TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.message.length === 0){
      this.MessageService.createHubConnection(this.user,this.member.username);
    }else{
      this.MessageService.stopConnection();
    }
  }

  ngOnDestroy(): void {
    this.MessageService.stopConnection();
  }
}
