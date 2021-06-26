import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

import { IMember } from 'src/app/_Models/Member';
import { MemberService } from 'src/app/_Services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  member:IMember;
  galleryOptions:NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];
  constructor(private MemberService:MemberService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.LoadMember();

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

  LoadMember(){
    this.MemberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(results =>{
      this.member = results
      this.galleryImages = this.GetImages();
      console.log(this.galleryImages);
    })
  }
}
