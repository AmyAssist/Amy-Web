import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClockDataService } from '../../Services/clock-data.service';
import { Clock } from '../../Objects/clock';

/*
  Component for the clock-plugin. It recieves data from the backend with a custom clock-dataservices and displays the data over
  the html-template.
*/
@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  clockData: Clock[];
  oneClockData: Clock;
  newClockData: Clock;
  selectedClock: Clock;
  d: Date;
  tomorrow: Date;
  alarmMonth: String;
  alarmDay: String;


  /*
    Providing the data-service for the clock-component
  */
  constructor(private clockService: ClockDataService) { }

  ngOnInit() {
    this.clockData = new Array<Clock>();
    this.newClockData = new Clock;
    this.clockService.setupPath();
  }

  /*
    Fetching all alarms from the service
  */
  getAlarms() {
    this.clockService.getAlarms()
      .subscribe((data: Clock[]) => this.clockData = [...data]);
  }

  getSpecificAlarm() {
    this.clockService.getSpecificAlarm().subscribe((data: Clock) => this.oneClockData = data);
  }

  /*
    Sending a alarm to the service that sets it.
  */
  setAlarm(day: number, hour: number, minute: number) {
    this.d = new Date();

    if (day == -1) {
      if (this.d.getMonth().toString().length < 2) {
        this.alarmMonth = "0" + this.d.getMonth().toString();
      } else {
        this.alarmMonth = this.d.getMonth().toString();
      }
      if (this.d.getDate().toString().length < 2) {
        this.alarmDay = "0" + this.d.getDate().toString();
      } else {
        this.alarmDay = this.d.getDate().toString();
      }
      this.newClockData.alarmTime = this.d.getFullYear().toString() + "-" + this.alarmMonth + "-" + this.alarmDay + "T" + hour + ":" + minute;
    } else {
      this.tomorrow = new Date();
      this.tomorrow.setDate(this.d.getDate() + 1);
      if (this.tomorrow.getMonth().toString().length < 2) {
        this.alarmMonth = "0" + this.tomorrow.getMonth().toString();
      } else {
        this.alarmMonth = this.tomorrow.getMonth().toString();
      }
      if (this.tomorrow.getDate().toString().length < 2) {
        this.alarmDay = "0" + this.tomorrow.getDate().toString();
      } else {
        this.alarmDay = this.tomorrow.getDate().toString();
      }
      this.newClockData.alarmTime = this.d.getFullYear().toString() + "-" + this.alarmMonth + "-" + this.alarmDay + "T" + hour + ":" + minute;
    }
    this.clockService.setNewAlarm(this.newClockData).subscribe(data => {
      this.getAlarms();
    });

  }

  editAlarm(id: number, day: number, edithour: number, editminute: number) {
    this.d = new Date();
    if (day == -1) {
      if (this.d.getMonth().toString().length < 2) {
        this.alarmMonth = "0" + this.d.getMonth().toString();
      } else {
        this.alarmMonth = this.d.getMonth().toString();
      }
      if (this.d.getDate().toString().length < 2) {
        this.alarmDay = "0" + this.d.getDate().toString();
      } else {
        this.alarmDay = this.d.getDate().toString();
      }
      this.clockData[id].alarmTime = this.d.getFullYear().toString() + "-" + this.alarmMonth + "-" + this.alarmDay + "T" + edithour + ":" + editminute;
    } else {
      this.tomorrow = new Date();
      this.tomorrow.setDate(this.d.getDate() + 1);
      if (this.tomorrow.getMonth().toString().length < 2) {
        this.alarmMonth = "0" + this.tomorrow.getMonth().toString();
      } else {
        this.alarmMonth = this.tomorrow.getMonth().toString();
      }
      if (this.tomorrow.getDate().toString().length < 2) {
        this.alarmDay = "0" + this.tomorrow.getDate().toString();
      } else {
        this.alarmDay = this.tomorrow.getDate().toString();
      }
      this.clockData[id].alarmTime = this.d.getFullYear().toString() + "-" + this.alarmMonth + "-" + this.alarmDay + "T" + edithour + ":" + editminute;
    }
    this.clockService.editAlarm(id, this.clockData).subscribe(data => {
      this.getAlarms();
    });

  }

  activatedeactivateAlarm(id: number) {
    this.clockService.activatedeactivateAlarm(id, this.clockData).subscribe(data => {
      this.getAlarms();
    });
  }

  deleteAlarm(id: number) {
    this.clockService.deleteAlarm(id).subscribe(data => {
      this.getAlarms();
    });
  }

  showEditFields(clock: Clock) {
    this.selectedClock = clock;
  }

}
