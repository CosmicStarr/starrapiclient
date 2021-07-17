import { Input, OnInit, TemplateRef } from '@angular/core';
import { Directive, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { IUser } from '../_Models/User';
import { AccountServicesService } from '../_Services/account-services.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[]; 

  user:IUser;
  constructor(private viewContainer:ViewContainerRef,private templateRef:TemplateRef<any>, private accountService:AccountServicesService) {
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(results =>{
      this.user = results;
    });
   }
  ngOnInit(): void {
    if(!this.user?.roles || this.user === null){
      this.viewContainer.clear();
      return;
    }

    if(this.user?.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainer.clear();
    }
  }

}
