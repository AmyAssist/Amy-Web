import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { command } from '../../Objects/command'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  commandData: command;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.commandData = new command;
  }

  /*
    Sending typed command to the backend-service for general functions.
  */
  sendCommand(commandValue: string){
    this.commandData.value=commandValue;
    this.databaseService.sendCommand(this.commandData);
  }
}
