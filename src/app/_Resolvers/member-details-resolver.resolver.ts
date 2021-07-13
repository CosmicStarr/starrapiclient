import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IMember } from '../_Models/Member';
import { MemberService } from '../_Services/member.service';

@Injectable({
  providedIn: 'root'
})


export class MemberDetailsResolverResolver implements Resolve<IMember> {
  constructor(private memberService:MemberService) {

  
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IMember> {
    return this.memberService.getMember(route.paramMap.get('username'));
  }
}
