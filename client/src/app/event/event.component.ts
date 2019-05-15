import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  @Input() event;
  @Input() baseUrl;
  @Output() attendanceEvent = new EventEmitter<string>();

  going:number = 0;
  maybe:number = 0;
  notGoing:number = 0;

  constructor() {
  }

  //eventList = null;
  //eventUrl = '';

  numberGoing(title):void{
    this.going+=1;
    this.attendanceEvent.emit(title);
  }
  numberMaybe(title):void{
    this.maybe+=1;
  }
  numberNotGoing(title):void{
    this.notGoing+=1;
  }

  ngOnInit() {
  this.event.displayurl = this.baseUrl + 'static/' + this.event.imageurl;
  }

}
