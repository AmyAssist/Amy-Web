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
  today: boolean;
  tomorrow: boolean;
  onDate: boolean;
  selectedDate: string;
  dateToday: string;
  dateTomorrow: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.getEventsToday();
  }

  setToday(): void {
    const currentDate = new Date();
    this.dateToday = currentDate.toISOString().slice(0, -1);
    this.selectedDate = this.dateToday;
  }

  setTomorrow(): void {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.dateTomorrow = currentDate.toISOString().slice(0, -1);
  }

  public getEventsToday(): void {
    this.today = true;
    this.tomorrow = false;
    this.onDate = false;
    this.setToday();
    this.calendarService.getEvents(this.dateToday).subscribe((data: CalendarEvent[]) => {
      this.events = [...data];
    });
  }

  public getEventsTomorrow(): void {
    this.today = false;
    this.tomorrow = true;
    this.onDate = false;
    this.setTomorrow();
    this.calendarService.getEvents(this.dateTomorrow).subscribe((data: CalendarEvent[]) => {
      this.events = [...data];
    });
  }

  public chosenDate(date): void {
    const makeDate = new Date(date);
    makeDate.setDate(makeDate.getDate() + 1);
    this.selectedDate = makeDate.toISOString().slice(0, -1);
    this.getEventsOnDate();
  }

  public getEventsOnDate(): void {
    this.today = false;
    this.tomorrow = false;
    this.onDate = true;
    this.calendarService.getEvents(this.selectedDate).subscribe((data: CalendarEvent[]) => {
      this.events = [...data];
    });
  }

  public refresh(): void {
    if (this.today) {
      this.getEventsToday();
    } else if (this.tomorrow) {
      this.getEventsTomorrow();
    } else if (this.onDate) {
      this.getEventsOnDate();
    }
  }

  public getTime(event): string {
    const startHour = this.checkTime(event.getStartDate().getHours());
    const startMinute = this.checkTime(event.getStartDate().getMinutes());
    const endHour = this.checkTime(event.getEndDate().getHours());
    const endMinute = this.checkTime(event.getEndDate().getMinutes());
    const start = startHour + ":" + startMinute;
    const end = endHour + ":" + endMinute;
    return start + " - " + end;
  }

  checkTime(time): string {
    if (time < 10) {
      return "0" + time;
    }
    return time;
  }
}
