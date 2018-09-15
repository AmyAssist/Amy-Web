import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';
import { LocalDateTime } from '../../../../Objects/LocalDateTime';
import { MatInput } from '@angular/material';

/*
  Component for viewing events on different dates.

  @author: Florian Bauer
*/
@Component({
  selector: 'app-events-day',
  templateUrl: './events-day.component.html',
  styleUrls: ['./events-day.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EventsDayComponent implements OnInit {

  events: CalendarEvent[];
  onDate: boolean;
  noDate: boolean;
  dateChoosen: boolean;
  selectedDate: string;
  dateString: string;

  @ViewChild('eventDate', {
    read: MatInput
  }) eventDate: MatInput;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.events = [];
    this.chosenDate('today');
  }

  public chosenDate(eventDate: string): void {
    this.noDate = false;
    this.dateString = eventDate;
    if (eventDate === 'today' || eventDate === 'tomorrow') {
      this.getDate(eventDate);
      this.dateChoosen = false;
      this.onDate = false;
    } else {
      this.dateChoosen = true;
      const makeDate = new Date(eventDate);
      this.selectedDate = new LocalDateTime(makeDate.getFullYear(), makeDate.getMonth(), makeDate.getDate(), 0, 0).toString();
    }
    this.getEvents();
  }

  public getDate(eventDate: string) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - tzoffset);
    if (eventDate === 'tomorrow') {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.selectedDate = currentDate.toISOString().slice(0, -1);
  }

  public getEvents(): void {
    this.calendarService.getEvents(this.selectedDate).subscribe((data: CalendarEvent[]) => {
      this.events = [...data];
    });
  }

  public getEventsOnDate(): void {
    if (this.eventDate) {
      this.eventDate.value = ``;
    }
    this.dateChoosen = false;
    this.noDate = true;
    this.dateString = ``;
    this.onDate = true;
    this.events = [];
  }

  public getTime(event): string {
    const startHour = this.formatTime(event.getStartDate().getHours());
    const startMinute = this.formatTime(event.getStartDate().getMinutes());
    const endHour = this.formatTime(event.getEndDate().getHours());
    const endMinute = this.formatTime(event.getEndDate().getMinutes());
    const start = `${startHour}:${startMinute}`;
    const end = `${endHour}:${endMinute}`;
    return `${start} - ${end}`;
  }

  formatTime(time): string {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }
}
