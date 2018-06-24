import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { command } from '../../Objects/command'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  command: command;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.command = new command;
  }

  sendCommand(command: string){
    this.command.value=command
    this.databaseService.playSong(this.command);
  }
}
