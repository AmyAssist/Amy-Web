import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { clock } from '../../Objects/clock'

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  clockData: clock[];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.clockData = new Array<clock>();
    /*
    this.clockData[1].hour = 12;
    this.clockData[1].minutes  = 30;
    this.clockData[2].hour = 18;
    this.clockData[2].minutes  = 0;
    */
  }

  getAlarms() {
    this.databaseService.getAlarms()
    .subscribe((data : clock[]) => this.clockData = { ...data});
  }

}
