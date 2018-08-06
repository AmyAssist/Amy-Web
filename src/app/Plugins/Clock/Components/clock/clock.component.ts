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
  setAlarm(hour: number, minute: number) {
    this.newClockData.hour = hour;
    this.newClockData.minute = minute;
    this.clockService.setNewAlarm(this.newClockData).subscribe();
    this.getAlarms();
  }

  editAlarm(edithour: number, editminute: number){
    this.getSpecificAlarm();
    this.newClockData.alarmNumber = this.oneClockData.alarmNumber;
    this.newClockData.hour = edithour;
    this.newClockData.minute = editminute;
    this.clockService.editAlarms(this.newClockData).subscribe();
    this.getAlarms();
  }

  showEditFields(){
    var x = document.getElementById("editFields");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

}
