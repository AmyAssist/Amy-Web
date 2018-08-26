import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../Objects/CalendarEvent';
import { CalendarDataService } from '../../Services/calendar-data.service';

@Component({
  selector: 'app-newEvent',
  templateUrl: './newEvent.component.html',
  styleUrls: ['./newEvent.component.css']
})
export class newEventComponent implements OnInit {

  constructor(private readonly calendarService: CalendarDataService) { }

  ngOnInit() {
    
  }

}
