import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  BusyRequestCount = 0;
  constructor(private NGXSpinner:NgxSpinnerService) { }

  Busy(){
    this.BusyRequestCount++
    this.NGXSpinner.show(undefined, {
      type:'ball-atom',
      bdColor:'rgba(255,255,255,0)',
      color:'#FFFF00'
    });
  }

  Idle(){
    this.BusyRequestCount--;
    if(this.BusyRequestCount <= 0){
      this.BusyRequestCount = 0
      this.NGXSpinner.hide();
    }
  }
}
