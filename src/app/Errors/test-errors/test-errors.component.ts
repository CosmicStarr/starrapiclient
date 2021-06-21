import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
  BaseUrl = environment.baseUrl;
  ValidationErrors:string[];
  constructor(private Http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.Http.get(this.BaseUrl + 'Errors/Not-Found').subscribe(results => {
      console.log(results);
    },error =>{
      console.log(error);
    });
  }

  get401Error(){
    this.Http.get(this.BaseUrl + 'Errors/auth').subscribe(results => {
      console.log(results);
    },error =>{
      console.log(error);
    });
  }

  get400Error(){
    this.Http.get(this.BaseUrl + 'Errors/Bad-Request').subscribe(results => {
      console.log(results);
    },error =>{
      console.log(error);
    });
  }

  get500Error(){
    this.Http.get(this.BaseUrl + 'Errors/Server-Error').subscribe(results => {
      console.log(results);
    },error =>{
      console.log(error);
    });
  }
  getValidationError(){
    this.Http.post(this.BaseUrl + 'account/register',{}).subscribe(results => {
      console.log(results);
    },error =>{
      console.log(error);
      this.ValidationErrors = error;
    });
  }


}
