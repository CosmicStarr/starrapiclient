import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IMember } from 'src/app/_Models/Member';
import { IUser } from 'src/app/_Models/User';
import { AccountServicesService } from 'src/app/_Services/account-services.service';
import { MemberService } from 'src/app/_Services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  member: IMember;
  User: IUser;
  Info:string = 'Success:';
  constructor(private accountService:AccountServicesService, private memberService:MemberService, private toastr:ToastrService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(results => this.User = results);
   }

  ngOnInit(): void {
    this.LoadMember();
  }

  LoadMember(){
    this.memberService.getMember(this.User.username).subscribe(results => {
      this.member = results;
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(()=>{
      console.log(this.member);
      this.toastr.success('Wonderful! You updated your profile', this.Info)
      this.editForm.reset(this.member);
    });
 
  }
}
