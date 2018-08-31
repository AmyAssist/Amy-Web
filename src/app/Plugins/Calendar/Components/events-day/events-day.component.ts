import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';
import { LocalDateTime } from '../../../../Objects/LocalDateTime';

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
  selectedDate: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.chosenDate('today');
  }

  public chosenDate(eventDate: string): void {
    if (eventDate === 'today' || eventDate === 'tomorrow') {
      this.getDate(eventDate);
      this.onDate = false;
    } else {
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
    this.onDate = true;
  }

  public refresh(): void {
    this.getEvents();
  }

  public getTime(event): string {
    const startHour = this.checkTime(event.getStartDate().getHours());
    const startMinute = this.checkTime(event.getStartDate().getMinutes());
    const endHour = this.checkTime(event.getEndDate().getHours());
    const endMinute = this.checkTime(event.getEndDate().getMinutes());
    const start = `${startHour}:${startMinute}`;
    const end = `${endHour}:${endMinute}`;
    return `${start} - ${end}`;
  }

  checkTime(time): string {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }
}
