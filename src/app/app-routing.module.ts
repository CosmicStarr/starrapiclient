import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { AuthenticateGuard } from './_guards/authenticate.guard';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

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
  {path:'errors',component:TestErrorsComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'**',component:NotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
