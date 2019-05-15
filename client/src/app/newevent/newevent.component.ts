import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-newphoto',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css'],
  providers: [ EventService ]
})
export class NeweventComponent implements OnInit {

  @Output() newEvent = new EventEmitter();

  event:any = {}
  fileToUpload: File = null;

  constructor(private eventService:EventService) { }

  fileInputField = null;

  handleFileInput(target):void{
    this.fileToUpload = target.files.item(0);
    this.fileInputField = target;
  }

  ngOnInit(){ }

  save(neweventForm) : void {
    let formData = new FormData();
    formData.append('image', this.fileToUpload, this.fileToUpload.name);
    formData.append('title', this.event.title);
    formData.append('date', this.event.date);
    formData.append('time', this.event.time);
    console.log("submitting");

    this.eventService.createEvent(formData)
      .subscribe((event)=>{
        console.log(event);
        this.newEvent.emit();
        neweventForm.reset();
        this.fileInputField.value="";
      });
  }
}
