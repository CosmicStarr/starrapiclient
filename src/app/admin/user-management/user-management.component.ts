import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from 'src/app/_modals/roles-modals/roles-modals.component';
import { IUser } from 'src/app/_Models/User';
import { AdminService } from 'src/app/_Services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: Partial<IUser[]>;
  bsModalRef:BsModalRef;
  constructor(private adminService:AdminService, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(results =>{
      this.users = results;
    })
  }

  openModalWithComponent(user:IUser) {
    const initialState = {
      class:'modal-dialog-centered',
      config :{
        user,
        roles:this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalsComponent, initialState);
    this.bsModalRef.content.updateSelectedRoles.subscribe(results =>{
      const rolesUpdate = {
        roles: [...results.filter(e => e.checked === true).map(e => e.name)]
      };
      if(rolesUpdate){
        this.adminService.updateUserRoles(user.username,rolesUpdate.roles).subscribe(()=>{
          user.roles = [...rolesUpdate.roles]
        })
      }
    })
  }

  private getRolesArray(user:IUser){
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name:'Admin', value:'Admin'},
      {name:'Manager', value:'Manager'},
      {name:'Member', value:'Member'},
    ];
    availableRoles.forEach(element => {
      let isMatch = false;
      for(const item of userRoles){
         if(element.name === item){
           isMatch = true;
           element.checked = true;
           roles.push(element);
           break;
         }
      }
      if(!isMatch){
        element.checked = false;
        roles.push(element);
      }
    });
    return roles;
  }

}
