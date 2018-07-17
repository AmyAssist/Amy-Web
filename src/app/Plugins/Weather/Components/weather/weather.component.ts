import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { Weather } from '../../Objects/weather';
import { WeatherWeek } from '../../Objects/weatherWeek';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherToday: Weather;
  weatherTomorrow: Weather;
  weatherWeekData: WeatherWeek;
  today: boolean;
  tommorow: boolean;
  week: boolean;

  constructor(private weatherService: WeatherDataService) { }

  ngOnInit() {
    this.weatherToday = new Weather();
    this.weatherTomorrow = new Weather();
    this.weatherWeekData = new WeatherWeek();
    this.today = false;
    this.tommorow = false;
    this.week = false;
  }

  getWeatherToday() {
    this.today = true;
    this.tommorow = false;
    this.week = false;
    this.weatherService.getWeatherToday()
      .subscribe((data: Weather) => this.weatherToday = { ...data });
  }

  getWeatherTomorrow() {
    this.today = false;
    this.tommorow = true;
    this.week = false;
    this.weatherService.getWeatherTomorrow()
      .subscribe((data: Weather) => this.weatherTomorrow = { ...data });
  }

  getWeatherWeek() {
    this.today = false;
    this.tommorow = false;
    this.week = true;
    this.weatherService.getWeatherWeek()
      .subscribe((data: WeatherWeek) => this.weatherWeekData = { ...data });
  }
}
