import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { Weather } from '../../Objects/weather';
import { WeatherWeek } from '../../Objects/weatherWeek';
import { Location } from '../../Objects/location';
import { DatabaseService } from '../../../../Services/database.service'
import { DatePipe } from '@angular/common';

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
  locations: Location[];
  selectedLocation: string;

  constructor(private readonly databaseService: DatabaseService, private weatherService: WeatherDataService) {
      this.weatherService.path = databaseService.path;
   }

  ngOnInit() {
    this.weatherToday = new Weather();
    this.weatherTomorrow = new Weather();
    this.weatherWeekData = new WeatherWeek();
    this.today = false;
    this.tommorow = false;
    this.week = false;
    this.weatherService.getAllLocations()
      .subscribe((data: Location[]) => {
        this.locations = data;
        this.selectedLocation = this.locations[0].name;
      });
  }

  public onChange(event): void {
    console.log(event.value);
    this.weatherService.sendLocation(event.value.id);
    this.selectedLocation = event.value.name;
    if (this.today) { this.getWeatherToday(); }
    if (this.tommorow) { this.getWeatherTomorrow(); }
    if (this.week) { this.getWeatherWeek(); }
  }

  getWeatherToday() {
    this.today = true;
    this.tommorow = false;
    this.week = false;
    this.weatherService.getWeatherToday()
      .subscribe((data: Weather) => {
        this.weatherToday = { ...data };
        this.weatherToday.iconSrc = this.getWeatherIcon(this.weatherToday);
        this.weatherToday.time = this.convertTime(this.weatherToday.timestamp);
      });
  }

  getWeatherTomorrow() {
    this.today = false;
    this.tommorow = true;
    this.week = false;
    this.weatherService.getWeatherTomorrow()
      .subscribe((data: Weather) => {
        this.weatherTomorrow = { ...data };
        this.weatherTomorrow.iconSrc = this.getWeatherIcon(this.weatherTomorrow);
        this.weatherTomorrow.time = this.convertTime(this.weatherTomorrow.timestamp);
      });

  }

  getWeatherWeek() {
    this.today = false;
    this.tommorow = false;
    this.week = true;
    this.weatherService.getWeatherWeek()
      .subscribe((data: WeatherWeek) => {
        this.weatherWeekData = { ...data };
        for (const weather of this.weatherWeekData.days) {
          weather.iconSrc = this.getWeatherIcon(weather);
          weather.time = this.convertTime(weather.timestamp);
        }
      });

  }

  getWeatherIcon(weather: Weather): string {
    switch (weather.icon) {
      case 'clear-day': {
        return weather.iconSrc = 'assets/weather/sunny.svg';
      }
      case 'clear-night': {
        return weather.iconSrc = 'assets/weather/sunny.svg';
      }
      case 'sleet': {
        return weather.iconSrc = 'assets/weather/rain.svg';
      }
      case 'rain': {
        return weather.iconSrc = 'assets/weather/rain.svg';
      }
      case 'snow': {
        return weather.iconSrc = 'assets/weather/snows.svg';
      }
      case 'wind': {
        return weather.iconSrc = 'assets/weather/wind.svg';
      }
      case 'fog': {
        return weather.iconSrc = 'assets/weather/hazy.svg';
      }
      case 'cloudy': {
        return weather.iconSrc = 'assets/weather/cloudy.svg';
      }
      default: {
        return weather.iconSrc = 'assets/weather/cloudy.svg';
      }
    }
  }

  convertTime(stamp: number): string {
    console.log(stamp);
    const datePipe = new DatePipe('en-US');
    const test = datePipe.transform(stamp * 1000, 'EEEE, MMMM d');
    console.log(test);
    return test;
  }
}
