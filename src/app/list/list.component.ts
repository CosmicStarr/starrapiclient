import { Component, OnInit } from '@angular/core';
import { IMember } from '../_Models/Member';
import { IPagination } from '../_Models/Pagination';
import { MemberService } from '../_Services/member.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  members:Partial<IMember[]>;
  predicate = 'Liked';
  pageNumber = 1;
  pageSize = 20;
  pagination:IPagination;

  constructor(private memberService:MemberService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate,this.pageNumber,this.pageSize).subscribe(results =>{
      this.members = results.results;
      this.pagination = results.pagination;
    })
  }

  pageChanged(event:any){
    this.pageNumber = event;
    this.loadLikes();
  }
}
