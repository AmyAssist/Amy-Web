import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

/*
  Component for setting up a new event.

  @author: Florian Bauer
*/
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
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
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDay());
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
    const newEvent = new CalendarEvent(title, start, end, description, this.location, this.reminderType, this.reminderTime, "", this.allDay);
    this.calendarService.setNewEvent(newEvent).subscribe();
  }

}
