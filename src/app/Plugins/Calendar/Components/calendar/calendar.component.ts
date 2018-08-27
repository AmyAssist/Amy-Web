import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

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
      this.events = [ ...data ];
    });
  }

  public getEventsTomorrow(): void {       
    this.today = false;
    this.tomorrow = true;
    this.onDate = false; 
    this.setTomorrow(); 
    this.calendarService.getEvents(this.dateTomorrow).subscribe((data: CalendarEvent[]) => {
      this.events = [ ...data ];
    });
  }

  public chosenDate(date): void {
    this.selectedDate = date.value.name;
    this.getEventsOnDate();
  }

  public getEventsOnDate(): void {  
    this.today = false;
    this.tomorrow = false;
    this.onDate = true;
    this.calendarService.getEvents(this.selectedDate).subscribe((data: CalendarEvent[]) => {
      this.events = [ ...data ];
    });
  }

  public refresh(): void {
    if(this.today){
      this.getEventsToday();
    } else if(this.tomorrow) {
      this.getEventsTomorrow();
    } else if(this.onDate) {
      this.getEventsOnDate();
    }
  }

  public getTime(event): string {
    var options = {hour: '2-digit', minute: "2-digit"}
    const startDate = event.getStartDate();
    startDate.setFullYear(undefined);
    const start = startDate.toLocaleDateString('de-DE', options);
    const end = event.getEndDate().toLocaleDateString('de-DE', options);
    return start + " - " + end;
  }
}
