import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: string;
  bsConfig:Partial<BsDatepickerConfig>;
  constructor(@Self() public ngControl:NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig ={
      containerClass:'theme-blue',
      dateInputFormat:'DD MMMM YYYY'
    }
   }
  writeValue(obj: any): void {
   
  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }


}