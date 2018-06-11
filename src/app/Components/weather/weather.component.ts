import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DatabaseService } from '../../Services/database.service';
import { weather } from '../../Objects/weather'
import { weatherWeek } from '../../Objects/weatherWeek';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherToday: weather;
  weatherTomorrow: weather;
  weatherWeekData: weatherWeek;
  today: boolean;
  tommorow: boolean;
  week: boolean;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.weatherToday = new weather();
    this.weatherTomorrow = new weather();
    this.weatherWeekData = new weatherWeek();
    this.today = false;
    this.tommorow = false;
    this.week = false;
  }

  getWeatherToday() {
    this.today = true;
    this.tommorow = false;
    this.week = false;
    this.databaseService.getWeatherToday()
    .subscribe((data : weather) => this.weatherToday = { ...data});
  }

  getWeatherTomorrow() {
    this.today = false;
    this.tommorow = true;
    this.week = false;
    this.databaseService.getWeatherTomorrow()
    .subscribe((data : weather) => this.weatherTomorrow = { ...data});
  }

  getWeatherWeek() {
    this.today = false;
    this.tommorow = false;
    this.week = true;
    this.databaseService.getWeatherWeek()
    .subscribe((data : weatherWeek) => this.weatherWeekData = { ...data});
  }
}
