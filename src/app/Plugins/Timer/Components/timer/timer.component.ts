import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TimerDataService } from '../../Services/timer-data.service';
import { Timer } from '../../Objects/timer';
import { LocalDateTime } from '../../../../Objects/LocalDateTime';

/*
  Component for the timer-plugin. It recieves data from the backend with a custom timer-dataservices and displays the data over
  the html-template.
*/
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit {

  timerData: Timer[];
  oneTimerData: Timer;
  selectedTimer: Timer;
  date: Date;
  hour: number;
  minute: number;
  second: number;
  /*
    Providing the data-service for the clock-component
  */
  constructor(private readonly clockService: TimerDataService) { }

  ngOnInit() {
    this.timerData = new Array<Timer>();
    this.getTimers();
    setInterval(() => this.date = new Date(), 1000);
  }

  /*
    Fetching all timers from the service
  */
  getTimers() {
    this.clockService.getTimers()
      .subscribe((data: Timer[]) => this.timerData = [...data]);
  }

  getSpecificTimer() {
    this.clockService.getSpecificTimer().subscribe((data: Timer) => this.oneTimerData = data);
  }

  /*
    Sending a timer to the service that sets it.
  */
  setTimer(hour: number, minute: number, second: number) {
    const timer = new Timer();

    if (second > 59) {
      minute = minute + Math.floor(second / 60);
      second = second % 60;
    }
    if (minute > 59) {
      hour = hour + Math.floor(minute / 60);
      minute = minute % 60;
    }
    timer.timerTime = this.toLocalDateTime(hour, minute, second).toString();
    this.clockService.setNewTimer(timer).subscribe(data => {
      this.getTimers();
    });
  }

  private toLocalDateTime(hour: number, minute: number, second: number) {
    const date = new Date();
    date.setHours(date.getHours() + hour);
    date.setMinutes(date.getMinutes() + minute);
    date.setSeconds(date.getSeconds() + second);
    return new LocalDateTime(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  }

  deleteTimer(id: number) {
    this.clockService.deleteTimer(id).subscribe(data => {
      this.getTimers();
    });
  }

  showEditFields(timer: Timer) {
    this.selectedTimer = timer;
  }

  activatedeactivateTimer(timer: Timer) {
    this.clockService.activatedeactivateTimer(timer.id, timer).subscribe(data => {
      timer.active = !timer.active;
      this.getTimers();
    });
  }

  timerTimeString(timer: Timer): string {
    const countDownDate = new Date(timer.timerTime).getTime();

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    if (!timer.active) {
      const timerString = timer.remainingTime.split(/[.T]/);
      const firstString = timerString[1];
      const hourString = firstString.split('H');
      var remainingString = hourString[0];
      if (hourString.length === 2) {
        hours = Number.parseInt(hourString[0]);
        remainingString = hourString[1];
      }

      const minuteString = remainingString.split('M');
      seconds = Number.parseInt(minuteString[0]);
      if (minuteString.length === 2) {
        minutes = Number.parseInt(minuteString[0]);
        seconds = Number.parseInt(minuteString[1]);
      }

      if (hours > 23) {
        days = Math.floor(hours / 24);
        hours = hours % 24;
      }

    } else {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        return '00:00:00';
      }
    }
    return `${days} Days, ${hours}:${minutes}:${seconds}`;
  }
}

