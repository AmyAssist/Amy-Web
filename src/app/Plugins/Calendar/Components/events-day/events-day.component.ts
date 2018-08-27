import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-events-day',
  templateUrl: './events-day.component.html',
  styleUrls: ['./events-day.component.css']
})
export class EventsDayComponent implements OnInit {

  events: CalendarEvent[];
  eventsString: string;
  eventsToday: CalendarEvent[];
  eventsTodayString: string;
  eventsTomorrow: CalendarEvent[];
  eventsTomorrowString: string;
  onDate: boolean;
  selectedDate: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.onDate = false;
    const currentDate = new Date();
    const currentDateISO = currentDate.toISOString().slice(0, -1);
    this.calendarService.getEvents(currentDateISO).subscribe((data: CalendarEvent[]) => {
      this.eventsToday = { ...data };
    });
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrow = currentDate.toISOString().slice(0, -1);
    this.calendarService.getEvents(tomorrow).subscribe((data: CalendarEvent[]) => {
      this.eventsTomorrow = { ...data };
    });
  }

  public onChange(event): void {
    this.selectedDate = event.value.name;
    this.onDate = true;
    this.calendarService.getEvents(this.selectedDate).subscribe((data: CalendarEvent[]) => {
      this.events = { ...data };
    });
  }

}
