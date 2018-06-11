import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DatabaseService } from '../../Services/database.service';
import { clock } from '../../Objects/clock'

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  clockData: clock[];
  newClockData: clock;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.clockData = new Array<clock>();
    this.newClockData = new clock;
    /*this.clockData.push( new clock(12,30))
    this.clockData.push( new clock(18,0))*/
  }

  getAlarms() {
    this.databaseService.getAlarms()
    .subscribe((data : clock[]) => this.clockData = { ...data});
  }

  setAlarm(hour: number, minute: number) {
    this.newClockData.hour = hour;
    this.newClockData.minute = minute;
    this.databaseService.setNewAlarm(this.newClockData);
    this.getAlarms();
  }

}
