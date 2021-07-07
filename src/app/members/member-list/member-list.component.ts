import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_Models/Member';
import { IPagination } from 'src/app/_Models/Pagination';
import { IUser } from 'src/app/_Models/User';
import { UserParam } from 'src/app/_Models/UserParams';
import { MemberService } from 'src/app/_Services/member.service';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  Members:IMember[];
  pagination:IPagination;
  userParams:UserParam;
  user:IUser;
  genderList = [{value: 'male', display: 'Male'}, {value: 'female', display: 'Female'}];  

  constructor(private MemberService:MemberService) {
    this.userParams = this.MemberService.getUserParams();
   }

  ngOnInit(): void {
    this.LoadMembers();
  }

  LoadMembers(){
    this.MemberService.setUserParams(this.userParams);
    this.MemberService.getMembers(this.userParams).subscribe(response =>{
      this.Members = response.results;
      this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.MemberService.resetUserParams()
    this.LoadMembers();
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.MemberService.setUserParams(this.userParams);
    this.LoadMembers();
  }

}
