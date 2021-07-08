import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMember } from 'src/app/_Models/Member';
import { MemberService } from 'src/app/_Services/member.service';

@Component({
  selector: 'app-membercard',
  templateUrl: './membercard.component.html',
  styleUrls: ['./membercard.component.scss']
})
export class MembercardComponent implements OnInit {
 @Input() member:IMember;
  constructor(private toastr:ToastrService, private MemberService:MemberService) { }

  ngOnInit(): void {
  }

  addLike(member:IMember){
    this.MemberService.addLike(member.username).subscribe(() =>{
      this.toastr.success("You Liked " + member.alsoKnownAs);
    })
  }
}
