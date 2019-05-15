import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventlistingsComponent } from './eventlistings/eventlistings.component';

import { RouterModule, Routes } from '@angular/router';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { FormsModule } from '@angular/forms';
import { NeweventComponent } from './newevent/newevent.component';

const routes:Routes = [
  { path: '', redirectTo: '/eventlistings', pathMatch: 'full'},
  { path: 'eventlistings', component: EventlistingsComponent },
  { path: 'event/:id', component: EventdetailsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventlistingsComponent,
    EventdetailsComponent,
    NeweventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
