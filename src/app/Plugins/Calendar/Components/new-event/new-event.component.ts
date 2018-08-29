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
  startChoosen: boolean;
  minDate: Date;
  startTime2: string;
  endTime2: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.allDay = false;
    this.startChoosen = false;
    this.minDate = null;
    this.resetValues();
  }

  setStart(): void {
    if(this.startTime2 === ''){
      this.startTime2 = "00:00";
    }
  }
  
  setEnd(): void {
    if(this.endTime2 === ''){
      this.endTime2 = "23:59";
    }
  }

  setAllDay() {
    this.allDay = !this.allDay;
  }

  startDateChoosen(dateValue): void {
    this.startChoosen = true;
    const makeDate = new Date(dateValue);
    this.minDate = new Date(makeDate.getFullYear(), makeDate.getMonth(), makeDate.getDate());
  }

  createEvent(startDateInput, endDateInput, timeValue): void {
    this.createLocation();
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    if (this.allDay) {
      endDate.setDate(endDate.getDate() + 1);
    }
    const startHour = this.startTime2.split(':')[0];
    const startMinute = this.startTime2.split(':')[1];
    const endHour = this.endTime2.split(':')[0];
    const endMinute = this.endTime2.split(':')[1];
    const start = new LocalDateTime(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), parseInt(startHour), parseInt(startMinute));
    const end = new LocalDateTime(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), parseInt(endHour), parseInt(endMinute));
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
    this.startTime2 = "00:00";
    this.endTime2 = "23:59";
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
