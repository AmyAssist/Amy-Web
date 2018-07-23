import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: CalendarEvent[];
  eventsToday: CalendarEvent[];
  eventsTomorrow: CalendarEvent[];
  onDate: boolean;
  today: boolean;
  tomorrow: boolean;
  selectedDate: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.onDate = true;
    this.today = false;
    this.tomorrow = false;
  }

  public onChange(event): void {
    this.selectedDate = event.value.name;
    this.getEvents(this.selectedDate);
  }

  getEvents(onDate: string){    
    this.onDate = false;
    this.today = true;
    this.tomorrow = false;
    this.calendarService.getEvents(onDate).subscribe((data: CalendarEvent[]) => {
      this.events = { ...data };
    })
  }

  getEventsToday(){   
    this.onDate = false;
    this.today = true;
    this.tomorrow = false;
    var currentDate = new Date();
    var currentDateISO = currentDate.toISOString();
    this.calendarService.getEvents(currentDateISO).subscribe((data: CalendarEvent[]) => {
      this.eventsToday = { ...data };
    })
  }

  getEventsTomorrow(){   
    this.onDate = false;
    this.today = false;
    this.tomorrow = true;
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    var tomorrow = currentDate.toISOString();
    this.calendarService.getEvents(tomorrow).subscribe((data: CalendarEvent[]) => {
      this.eventsTomorrow = { ...data };
    })
  }

}
