import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticateGuard } from './_guards/authenticate.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate: [AuthenticateGuard],
    children:[
      {path:'members',component:MemberListComponent, canActivate: [AuthenticateGuard]},
      {path:'members/:id',component:MemberDetailsComponent},
      {path:'lists',component:ListComponent},
      {path:'messages',component:MessagesComponent},
      
    ]
  },
  {path:'**',component:HomeComponent, pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
