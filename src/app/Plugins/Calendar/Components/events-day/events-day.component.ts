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

  datePickerActive: boolean;
  noDatePicked: boolean;
  dateString: string;

  @ViewChild('eventDate', {
    read: MatInput
  }) eventDate: MatInput;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.calendarService.resetEvents();
    this.chosenDate('today');
    this.calendarService.updateEvents();
  }

  get events(): CalendarEvent[] {
    return this.calendarService.getEvents();
  }

  public chosenDate(eventDate: string): void {
    this.noDatePicked = false;
    this.dateString = eventDate;
    if (eventDate === 'today' || eventDate === 'tomorrow') {
      this.getDate(eventDate);
      this.datePickerActive = false;
    } else {
      const makeDate = new Date(eventDate);
      this.calendarService.setSelectedDate(new LocalDateTime(makeDate.getFullYear(), makeDate.getMonth(), makeDate.getDate(), 0, 0).toString());
    }
    this.calendarService.updateEvents();
  }

  public getDate(eventDate: string) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - tzoffset);
    if (eventDate === 'tomorrow') {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.calendarService.setSelectedDate(currentDate.toISOString().slice(0, -1));
  }

  public toggleDatePicker(): void {
    this.dateString = '';
    if (this.eventDate) {
      this.eventDate.value = ``;
    }
    this.noDatePicked = true;
    this.datePickerActive = true;
    this.calendarService.resetEvents();
  }

  public getTime(event): string {
    const startHour = this.formatTime(event.getStartDate().getHours());
    const startMinute = this.formatTime(event.getStartDate().getMinutes());
    const endHour = this.formatTime(event.getEndDate().getHours());
    const endMinute = this.formatTime(event.getEndDate().getMinutes());
    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  }

  formatTime(time): string {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }
}
