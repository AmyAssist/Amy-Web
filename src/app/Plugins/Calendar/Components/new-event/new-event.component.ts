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
  titleChoosen: boolean;
  startChoosen: boolean;
  endChoosen: boolean;
  minDate: Date;
  endDate: Date;
  startTime2: string;
  endTime2: string;

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    this.minDate = null;
    this.endDate = null;
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

  setAllDay() {
    this.allDay = !this.allDay;
  }

  startDateChoosen(dateValue): void {
    this.startChoosen = true;
    const makeDate = new Date(dateValue);
    this.minDate = new Date(makeDate.getFullYear(), makeDate.getMonth(), makeDate.getDate());
  }

  endDateChoosen(dateValue): void {
    this.endChoosen = true;
    this.endDate = new Date(dateValue);
  }

  createEvent(timeValue): void {
    this.createLocation();
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
    const newEvent = CalendarEvent.setEventData(this.title, start.toString(), end.toString(),
      this.description, this.location, this.reminderType, this.reminderTime, '', this.allDay);
    this.calendarService.setNewEvent(newEvent).subscribe();
    this.resetValues();
    this.endDate.setDate(this.endDate.getDate() - 1);

  }

  resetValues(): void {
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
