import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'StarrClient';
  users:any;
  baseUrl = environment.baseUrl;

  constructor(private httpclient:HttpClient) { 
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.httpclient.get(this.baseUrl + 'api/users').subscribe(results =>{
      this.users = results;
    },error =>{
      console.log(error);
    });
  }
}
