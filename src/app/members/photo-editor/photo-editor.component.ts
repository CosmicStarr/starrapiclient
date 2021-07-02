import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { IPhoto } from 'src/app/_Models/IPhoto';
import { IMember } from 'src/app/_Models/Member';
import { IUser } from 'src/app/_Models/User';
import { AccountServicesService } from 'src/app/_Services/account-services.service';
import { MemberService } from 'src/app/_Services/member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() Member:IMember;
  Uploader:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseUrl;
  User:IUser;
  constructor(private accountService:AccountServicesService,private memberService:MemberService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(results =>{
      this.User = results; 
    })
   }

  ngOnInit(): void {
    this.InitializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(Photo:IPhoto){
    this.memberService.setMainPhoto(Photo.id).subscribe(() => {
      this.User.photoUrl = Photo.photoUrl;
      this.accountService.SetCurrentUser(this.User);
      this.Member.photoUrl = Photo.photoUrl;
      this.Member.photos.forEach(p => {
        if(p.mainPic) p.mainPic = false;
        if(p.id === Photo.id) p.mainPic = true;
      })
    })
  }

  deletePhoto(photoId:number){
    this.memberService.deletePhoto(photoId).subscribe(()=>{
      this.Member.photos = this.Member.photos.filter(x => x.id !== photoId);
    });
  }

  InitializeUploader(){
    this.Uploader = new FileUploader({
      url:this.baseUrl + 'Users/add-Photo',
      authToken: 'Bearer '+ this.User.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });

    this.Uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.Uploader.onSuccessItem = (item,response,status,headers) =>{
      if(response){
        const photo:IPhoto = JSON.parse(response);
        this.Member.photos.push(photo);
        if(photo.mainPic){
          this.User.photoUrl = photo.photoUrl;
          this.Member.photoUrl = photo.photoUrl;
          this.accountService.SetCurrentUser(this.User); 
        }
      }
    }
  }
}
