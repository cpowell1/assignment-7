import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class EventService {
  // track maxId value, will be incremented when we create()
  maxId = 3;
  private apiurl = environment.apiurl;
  eventUrl = environment.eventUrl;
  
  constructor(private http:HttpClient) { }

  listEvents(){
    return this.http.get(this.apiurl + 'api/events');
  }

  getEvent(id){
    return this.http.get(this.apiurl + 'api/events/' + id);
  }

  createEvent(event: FormData){
    return this.http.post(this.apiurl+'api/events/', event);
  }

  updateEvent(id, data){
      return this.http.put(this.apiurl + 'api/events/' + id, data);
  }

  deleteEvent(id){
    return this.http.delete(this.apiurl + 'api/events/' + id);
  }

}
