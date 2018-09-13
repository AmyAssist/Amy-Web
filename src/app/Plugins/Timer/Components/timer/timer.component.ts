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
  /*
    Providing the data-service for the clock-component
  */
  constructor(private clockService: TimerDataService) { }

  ngOnInit() {
    this.timerData = new Array<Timer>();
    this.getTimers();
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

    if(second > 59){
      minute = minute + Math.floor(second/60);
      second = second%60;
    }
    if(minute > 59){
      hour = hour + Math.floor(minute/60);
      minute = minute%60;
    }
    timer.timerTime = this.toLocalDateTime(hour, minute, second).toString();
    this.clockService.setNewTimer(timer).subscribe(data => {
      this.getTimers();
      this.countdownTimer(timer, timer.id.toString());
      
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
      this.getTimers();
    });
  }

  displayTimerTime(timer: Timer) {
    var splitted = timer.remainingTime.toString().split(/[T,H,M,.]+/);
    for (var i = 0; i <= 4; i++) {
      if (splitted[i].length === 1) {
        splitted[i] = '0' + splitted[i];
      }
    }
    return splitted[1] + ':' + splitted[2] + ':' + splitted[3];
  }


  countdownTimer(timer: Timer, i: string) {
    var countDownDate = new Date(timer.timerTime).getTime();

    var x = setInterval(function () {

      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById(i).innerHTML = days + " Days, " + hours + ":"
        + minutes + ":" + seconds;

      if (distance < 0) {
        clearInterval(x);
        document.getElementById(i).innerHTML = "00:00:00";
      }
    }, 1000);
  }
}

