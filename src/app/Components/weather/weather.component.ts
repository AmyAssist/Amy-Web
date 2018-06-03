import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { weather } from '../../Objects/weather'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherToday: weather;
  weatherTomorrow: weather;
  weatherWeek: weather[];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.weatherToday = new weather();
    this.weatherTomorrow = new weather();
    this.weatherWeek = new Array<weather>();
  }

  getWeatherToday() {
    this.databaseService.getWeatherToday()
    .subscribe((data : weather) => this.weatherToday = { ...data});
  }

  getWeatherTomorrow() {
    this.databaseService.getWeatherTomorrow()
    .subscribe((data : weather) => this.weatherTomorrow = { ...data});
  }

  getWeatherWeek() {
    this.databaseService.getWeatherWeek()
    .subscribe((data : weather[]) => this.weatherWeek = { ...data});
  }
}
