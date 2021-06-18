import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountServicesService } from '../_Services/account-services.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model:any = {}
  
  @Output() CancelRegister = new EventEmitter();
  constructor(private Http:HttpClient, private accountService:AccountServicesService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  
  register(){
    this.accountService.registerUser(this.model).subscribe(results => {
      console.log(results);
      this.cancelled();
    },error =>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancelled(){
    this.CancelRegister.emit(false);
  }
}
