import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_Models/Member';
import { MemberService } from 'src/app/_Services/member.service';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members:IMember[];

  constructor(private MemberService:MemberService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.MemberService.getMembers().subscribe(results => {
      this.members = results
    })
  }

}
