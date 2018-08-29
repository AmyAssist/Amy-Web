import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';
import { LocalDateTime } from '../../../../Objects/LocalDateTime';

/*
  Component for setting up a new event.

  @author: Florian Bauer
*/
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NewEventComponent implements OnInit {

  allDay: boolean;
  location: string;
  reminderTime: number;
  timeUnit: string;
  reminderType: string;

  constructor(private calendarService: CalendarDataService) { }

  ngOnInit() {
    this.allDay = false;
    this.location = "";
    this.reminderTime = null;
    this.timeUnit = "minutes";
    this.reminderType = "email";
  }

  setAllDay() {
    this.allDay = !this.allDay;
  }

  createEvent(title, startDateInput, endDateInput, description, address, city, country, postalCode, timeValue): void {
    this.location = address;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const start = new LocalDateTime(startDate.getFullYear(), startDate.getMonth(), startDate.getDay(), 0, 0);
    const end = new LocalDateTime(endDate.getFullYear(), endDate.getMonth(), endDate.getDay(), 23, 59);
    if (postalCode != "") {
      this.location += ", " + postalCode;
      if (city != "") {
        this.location += " " + city;
      }
    } else if (city != "") {
      this.location += ", " + city;
    }
    if (country != "") {
      this.location += ", " + country;
    }

    if (this.timeUnit == "minutes") {
      this.reminderTime = timeValue;
    } else if (this.timeUnit == "hours") {
      this.reminderTime = 60 * timeValue;
    } else if (this.timeUnit == "days") {
      this.reminderTime = 24 * 60 * timeValue;
    } else if (this.timeUnit == "weeks") {
      this.reminderTime = 7 * 24 * 60 * timeValue;
    }
    const newEvent = CalendarEvent.setEventData(title, start.toString(), end.toString(), description, this.location, this.reminderType, this.reminderTime, "", this.allDay);
    this.calendarService.setNewEvent(newEvent).subscribe();
  }

}
