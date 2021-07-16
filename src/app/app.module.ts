import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { GlobalErrorsInterceptor } from './_Errorinterceptors/global-errors.interceptor';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MembercardComponent } from './members/membercard/membercard.component';
import { JwtInterceptor } from './_Errorinterceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_Errorinterceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_Forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HasRoleDirective } from './_directives/has-role.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    ListComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MembercardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    SharedModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:GlobalErrorsInterceptor,multi:true},
              {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
              {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
