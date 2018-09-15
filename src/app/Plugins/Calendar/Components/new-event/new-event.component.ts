import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';
import { LocalDateTime } from '../../../../Objects/LocalDateTime';
import { MatInput } from '@angular/material';

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
  titleChoosen: boolean;
  startChoosen: boolean;
  endChoosen: boolean;
  minDate: Date;
  endDate: Date;
  startTime2: string;
  endTime2: string;
  hintString: string;
  missingInformation: string[];
  correctTime: boolean;

  @ViewChild('eventStart', {
    read: MatInput
  }) eventStart: MatInput;

  @ViewChild('eventEnd', {
    read: MatInput
  }) eventEnd: MatInput;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.resetValues();
  }

  setStart(): void {
    if (this.startTime2 === '') {
      this.startTime2 = '00:00';
    }
  }

  setTitle(): void {
    if (this.title !== '') {
      this.titleChoosen = true;
    } else {
      this.titleChoosen = false;
      this.startChoosen = false;
      this.endChoosen = false;
    }
  }

  setEnd(): void {
    if (this.endTime2 === '') {
      this.endTime2 = '23:59';
    }
  }

  toggleAllDay() {
    this.allDay = !this.allDay;
  }

  startDateChoosen(dateValue): void {
    this.startChoosen = true;
    this.minDate = new Date(dateValue);
  }

  endDateChoosen(dateValue): void {
    this.endChoosen = true;
    this.endDate = new Date(dateValue);
  }

  createEvent(timeValue, allDayCheck): void {
    this.correctTime = this.checkIfEndAfterStart();
    if (this.correctTime && this.titleChoosen && this.startChoosen && this.endChoosen) {
      this.formatLocation();
      if (this.allDay) {
        this.endDate.setDate(this.endDate.getDate() + 1);
      }
      const startHour = this.startTime2.split(':')[0];
      const startMinute = this.startTime2.split(':')[1];
      const endHour = this.endTime2.split(':')[0];
      const endMinute = this.endTime2.split(':')[1];
      const start = new LocalDateTime(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate(), parseInt(startHour, 10), parseInt(startMinute, 10));
      const end = new LocalDateTime(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), parseInt(endHour, 10), parseInt(endMinute, 10));
      if (this.timeUnit === 'minutes') {
        this.reminderTime = timeValue;
      } else if (this.timeUnit === 'hours') {
        this.reminderTime = 60 * timeValue;
      } else if (this.timeUnit === 'days') {
        this.reminderTime = 24 * 60 * timeValue;
      } else if (this.timeUnit === 'weeks') {
        this.reminderTime = 7 * 24 * 60 * timeValue;
      }
      const newEvent = CalendarEvent.createEvent(this.title, start.toString(), end.toString(),
        this.description, this.location, this.reminderType, this.reminderTime, '', this.allDay);
      this.calendarService.setNewEvent(newEvent);
      this.endDate.setDate(this.endDate.getDate() - 1);
      this.resetValues();
      allDayCheck.checked = false;
    } else {
      this.hintMessage();
    }
  }

  checkIfEndAfterStart(): boolean {
    this.setStart();
    this.setEnd();
    if (this.minDate && this.endDate) {
      if (this.endDate.getTime() > this.minDate.getTime()) {
        return true;
      } else if (this.endDate.getTime() === this.minDate.getTime()) {
        const startHour = this.startTime2.split(':')[0];
        const startMinute = this.startTime2.split(':')[1];
        const endHour = this.endTime2.split(':')[0];
        const endMinute = this.endTime2.split(':')[1];
        if (endHour > startHour) {
          return true;
        } else if (endHour === startHour) {
          if (endMinute > startMinute) {
            return true;
          }
        }
      }
    }
    return false;
  }

  hintMessage() {
    this.hintString = `Please add the following details:`;
    this.missingInformation = [];
    if (!this.title) {
      this.missingInformation.push(`Title`);
    }
    if (!this.startChoosen) {
      this.missingInformation.push(`Start of event`);
    }
    if (!this.endChoosen) {
      this.missingInformation.push(`End of event`);
    }
    if (this.minDate && this.endDate && !this.correctTime) {
      this.missingInformation.push(`The end of the event has to be after the start.`);
    }
  }

  resetValues(): void {
    this.minDate = null;
    this.endDate = null;
    this.eventStart.value = ``;
    this.eventEnd.value = ``;
    this.allDay = false;
    this.titleChoosen = false;
    this.startChoosen = false;
    this.endChoosen = false;
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
    this.startTime2 = '00:00';
    this.endTime2 = '23:59';
    this.hintString = null;
    this.missingInformation = [];
    this.correctTime = false;
  }

  // this method makes sure that the location is displayed the right way
  formatLocation(): void {
    if (this.address !== '') {
      this.location += `${this.address}, `;
    }
    if (this.postalCode !== '' || this.city !== '') {
      this.location += `${this.postalCode} ${this.city}, `;
    }
    if (this.country !== '') {
      this.location += this.country;
    }
    this.location = this.location.replace(' ,', ',');
    if (this.location.substr(-2, 2) === ', ') {
      this.location = this.location.slice(0, -2);
    }
  }

}
