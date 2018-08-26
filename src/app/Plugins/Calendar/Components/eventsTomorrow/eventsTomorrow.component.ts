import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-eventsTomorrow',
  templateUrl: './eventsTomorrow.component.html',
  styleUrls: ['./eventsTomorrow.component.css']
})
export class EventsTomorrowComponent implements OnInit {

  eventsTomorrow: CalendarEvent[];
  eventsTomorrowString: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrow = currentDate.toISOString().slice(0, -1);
    this.calendarService.getEvents(tomorrow).subscribe((data: CalendarEvent[]) => {
      this.eventsTomorrow = { ...data };
    });
  }
  
}
