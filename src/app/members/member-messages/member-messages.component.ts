import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMember } from 'src/app/_Models/Member';
import { IMessages } from 'src/app/_Models/Messages';
import { MemberService } from 'src/app/_Services/member.service';
import { MessageService } from 'src/app/_Services/message.service';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm
  @Input() message:IMessages[];
  @Input() username:string;
  messageContent:string;

  
  constructor(private messageService:MessageService) { }

  ngOnInit(): void {

  }

  sendMessages(){
    this.messageService.sendMessage(this.username,this.messageContent).subscribe(results =>{
      this.message.push(results);
      this.messageForm.reset()
    })
  }

  



}
