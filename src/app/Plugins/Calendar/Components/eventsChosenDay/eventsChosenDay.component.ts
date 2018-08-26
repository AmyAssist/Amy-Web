import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-eventsChosenDay',
  templateUrl: './eventsChosenDay.component.html',
  styleUrls: ['./eventsChosenDay.component.css']
})
export class eventsChosenDayComponent implements OnInit {

  events: CalendarEvent[];
  eventsString: string;
  selectedDate: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {

  }

  public onChange(event): void {
    this.selectedDate = event.value.name;
    this.calendarService.getEvents(this.selectedDate).subscribe((data: CalendarEvent[]) => {
      this.events = { ...data };
    })
  }
}
