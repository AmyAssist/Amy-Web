import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClockDataService } from '../../Services/clock-data.service';
import { Clock } from '../../Objects/clock';
import { LocalDateTime } from '../../../../Objects/LocalDateTime';

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
  selectedClock: Clock;

  /*
    Providing the data-service for the clock-component
  */
  constructor(private clockService: ClockDataService) { }

  ngOnInit() {
    this.clockData = new Array<Clock>();
    this.getAlarms();
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
  setAlarm(day: string, hour: number, minute: number) {
    const alarmClock = new Clock();
    alarmClock.alarmTime = this.toLocalDateTime(day, hour, minute).toString();

    this.clockService.setNewAlarm(alarmClock).subscribe(data => {
      this.getAlarms();
    });
  }

  editAlarm(id: number, day: string, edithour: number, editminute: number) {
    const alarmClock = new Clock();
    alarmClock.alarmTime = this.toLocalDateTime(day, edithour, editminute).toString();
    alarmClock.id = id;

    this.clockService.editAlarm(id, alarmClock).subscribe(data => {
      this.getAlarms();
    });
  }

  private toLocalDateTime(day: string, hour: number, minute: number) {
    const date = new Date();
    if (day === 'tomorrow') {
      date.setDate(date.getDate() + 1);
    }

    return new LocalDateTime(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
  }

  activatedeactivateAlarm(alarm: Clock) {
    this.clockService.activatedeactivateAlarm(alarm.id, alarm).subscribe(data => {
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
