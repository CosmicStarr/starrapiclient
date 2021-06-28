import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent):boolean{
    if(component.editForm.dirty){
      return confirm('Are sure you want to continue? Any unsaved changes with be deleted!')
    }
    return true;
  }
  
}
