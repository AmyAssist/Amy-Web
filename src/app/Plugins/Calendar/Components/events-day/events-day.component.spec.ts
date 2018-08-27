import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDayComponent } from './events-day.component';

describe('EventsDayComponent', () => {
  let component: EventsDayComponent;
  let fixture: ComponentFixture<EventsDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
