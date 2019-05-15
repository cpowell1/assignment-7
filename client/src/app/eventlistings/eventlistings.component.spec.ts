import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlistingsComponent } from './eventlistings.component';

describe('EventlistingsComponent', () => {
  let component: EventlistingsComponent;
  let fixture: ComponentFixture<EventlistingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventlistingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventlistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
