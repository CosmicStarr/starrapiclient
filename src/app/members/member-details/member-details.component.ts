import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

import { IMember } from 'src/app/_Models/Member';
import { IMessages } from 'src/app/_Models/Messages';
import { MemberService } from 'src/app/_Services/member.service';
import { MessageService } from 'src/app/_Services/message.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('tabs',{static:true}) tabs: TabsetComponent;
  activeTab: TabDirective;
  message:IMessages[] = [];
  member:IMember;
  galleryOptions:NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];
  constructor(private MemberService:MemberService,private route:ActivatedRoute,private MessageService:MessageService) { }

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
      this.LoadMessages();
    }
  }
}
