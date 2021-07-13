import { Component, OnInit } from '@angular/core';
import { IMessages } from '../_Models/Messages';
import { IPagination } from '../_Models/Pagination';
import { MessageService } from '../_Services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages:IMessages[] = [];
  pagination:IPagination;
  container = 'Unread';
  loading = false;
  pageNumber = 1;
  pageSize = 5;
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.LoadMessages();
  }

  LoadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize,this.container).subscribe(results => {
      this.messages = results.results;
      this.pagination = results.pagination;
      this.loading = false;
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.LoadMessages();
  }

  deleteMessages(Id:number){
    this.messageService.deleteMSG(Id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.messageid === Id),1);
    }, error =>{
      console.log(error)
    })
  }
  

}
