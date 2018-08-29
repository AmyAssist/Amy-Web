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

  title: string;
  description: string;
  allDay: boolean;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  location: string;
  reminderTime: number;
  timeUnit: string;
  reminderType: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.allDay = false;
    this.resetValues();
  }

  setAllDay() {
    this.allDay = !this.allDay;
  }

  createEvent(startDateInput, endDateInput, timeValue): void {
    this.createLocation();
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    if (this.allDay) {
      endDate.setDate(endDate.getDate() + 1);
    }
    const start = new LocalDateTime(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0);
    const end = new LocalDateTime(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59);
    if (this.timeUnit === 'minutes') {
      this.reminderTime = timeValue;
    } else if (this.timeUnit === 'hours') {
      this.reminderTime = 60 * timeValue;
    } else if (this.timeUnit === 'days') {
      this.reminderTime = 24 * 60 * timeValue;
    } else if (this.timeUnit === 'weeks') {
      this.reminderTime = 7 * 24 * 60 * timeValue;
    }
    const newEvent = CalendarEvent.setEventData(this.title, start.toString(), end.toString(),
      this.description, this.location, this.reminderType, this.reminderTime, '', this.allDay);
    this.calendarService.setNewEvent(newEvent).subscribe();
    this.resetValues();
  }

  resetValues(): void {
    this.location = '';
    this.reminderTime = null;
    this.timeUnit = 'minutes';
    this.reminderType = 'email';
    this.title = '';
    this.description = '';
    this.address = '';
    this.city = '';
    this.postalCode = '';
    this.country = '';
  }

  // this method makes sure that the location is displayed the right way
  createLocation(): void {
    this.location += this.address;
    if (this.address === '' && this.postalCode === '' && this.city === '') {
      this.location += this.country;
    } else if (this.address === '' && this.postalCode === '') {
      this.location += this.city;
      if (this.country !== '') {
        this.location += ', ' + this.country;
      }
    } else if (this.address === '') {
      this.location += this.postalCode;
      if (this.city !== '') {
        this.location += ' ' + this.city;
        if (this.country !== '') {
          this.location += ', ' + this.country;
        }
      } else if (this.country !== '') {
        this.location += ', ' + this.country;
      }
    } else {
      if (this.postalCode !== '') {
        this.location += ', ' + this.postalCode;
        if (this.city !== '') {
          this.location += ' ' + this.city;
        }
        if (this.country !== '') {
          this.location += ', ' + this.country;
        }
      } else if (this.city !== '') {
        this.location += ', ' + this.city;
        if (this.country !== '') {
          this.location += ', ' + this.country;
        }
      } else if (this.country !== '') {
        this.location += ', ' + this.country;
      }
    }
  }

}
