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
  selectedDate: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.onDate = false;
    var currentDate = new Date();
    var currentDateISO = currentDate.toISOString().slice(0,-1);
    this.calendarService.getEvents(currentDateISO).subscribe((data: CalendarEvent[]) => {
      this.eventsToday = { ...data };
    })
    currentDate.setDate(currentDate.getDate() + 1);
    var tomorrow = currentDate.toISOString().slice(0,-1);
    this.calendarService.getEvents(tomorrow).subscribe((data: CalendarEvent[]) => {
      this.eventsTomorrow = { ...data };
    })
  }

  public onChange(event): void {
    this.selectedDate = event.value.name;
    this.onDate = true;
    this.calendarService.getEvents(this.selectedDate).subscribe((data: CalendarEvent[]) => {
      this.events = { ...data };
    })
  }
}
