import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-eventsToday',
  templateUrl: './eventsToday.component.html',
  styleUrls: ['./eventsToday.component.css']
})
export class EventsTodayComponent implements OnInit {

  eventsToday: CalendarEvent[];
  eventsTodayString: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    const currentDate = new Date();
    const currentDateISO = currentDate.toISOString().slice(0, -1);
    this.calendarService.getEvents(currentDateISO).subscribe((data: CalendarEvent[]) => {
      this.eventsToday = { ...data };
    });
    this.calendarService.getEventsToday().subscribe((data: string) =>
      this.eventsTodayString = data);
  }
  
}
