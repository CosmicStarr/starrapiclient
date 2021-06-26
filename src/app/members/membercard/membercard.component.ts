import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/_Models/Member';

@Component({
  selector: 'app-membercard',
  templateUrl: './membercard.component.html',
  styleUrls: ['./membercard.component.scss']
})
export class MembercardComponent implements OnInit {
 @Input() member:IMember;
  constructor() { }

  ngOnInit(): void {
  }

}
