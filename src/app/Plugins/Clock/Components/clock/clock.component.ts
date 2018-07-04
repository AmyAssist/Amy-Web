import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ClockDataService } from '../../Services/clock-data.service';
import { clock } from '../../Objects/clock'

/*
  Component for the clock-plugin. It recieves data from the backend with a custom clock-dataservices and displays the data over the html-template.
*/
@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  clockData: clock[];
  newClockData: clock;

  constructor(private databaseService: ClockDataService) { }

  ngOnInit() {
    this.clockData = new Array<clock>();
    this.newClockData = new clock;
  }

  getAlarms() {
    this.databaseService.getAlarms()
    .subscribe((data : clock[]) => this.clockData = [ ...data]);
  }

  setAlarm(hour: number, minute: number) {
    this.newClockData.hour = hour;
    this.newClockData.minute = minute;
    this.databaseService.setNewAlarm(this.newClockData);
    this.getAlarms();
  }

}