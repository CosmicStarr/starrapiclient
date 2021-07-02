import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountServicesService } from '../_Services/account-services.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  RegisterForm:FormGroup;
  maxDate: Date;
  ValidationErrors: string[] = [];
  
  @Output() CancelRegister = new EventEmitter();
  constructor(private Http:HttpClient, 
    private accountService:AccountServicesService,
    private toastr:ToastrService,
    private FormBuild:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);

  }

  initializeForm(){
    this.RegisterForm = this.FormBuild.group({
      gender: ['male'],
      alsoKnownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',[Validators.minLength(9),Validators.maxLength(16)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]]
    })
    this.RegisterForm.controls.password.valueChanges.subscribe(()=>{
      this.RegisterForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchToo: string): ValidatorFn {
    return (control:AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchToo].value ? null : {isMatching: true}
    }
  }

  register(){
    this.accountService.registerUser(this.RegisterForm.value).subscribe(results => {
      this.router.navigateByUrl('/members')
      console.log(results);
    },error =>{
      this.ValidationErrors = error;
    })
  }

  cancelled(){
    this.CancelRegister.emit(false);
  }
}
