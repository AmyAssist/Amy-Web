import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { WeatherNow } from '../../Objects/weatherNow';
import { WeatherDay } from '../../Objects/weatherDay';
import { WeatherWeek } from '../../Objects/weatherWeek';
import { Location } from '../../Objects/location';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  showReportWeek: WeatherDay[];
  showReportDay: WeatherDay;
  showReportNow: WeatherNow;

  locations: Location[];
  selectedLocation: string;

  constructor(private readonly weatherService: WeatherDataService) {
  }

  ngOnInit() {
    this.weatherService.getAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
      this.selectLocation(this.locations[0]);
    });
  }

  public changeLocation(event): void {
    this.selectLocation(event.value);
  }

  public selectLocation(location: Location): void {
    this.weatherService.sendLocation(location.persistentId);
    this.selectedLocation = location.name;
    this.getWeatherNow();
    this.getWeatherDay();
    this.getWeatherWeek();
  }

  getWeatherNow() {
    this.weatherService.getWeatherNow()
      .subscribe((data: WeatherNow) => {
        const weatherNow = { ...data };
        weatherNow.iconSrc = this.getWeatherIcon(weatherNow.icon);
        weatherNow.time = this.convertTime(weatherNow.timestamp);
        this.showReportNow = weatherNow;
      });
  }

  getWeatherDay() {
    this.weatherService.getWeatherToday()
      .subscribe((data: WeatherDay) => {
        const weatherDay = { ...data };
        weatherDay.iconSrc = this.getWeatherIcon(weatherDay.icon);
        weatherDay.time = this.convertTime(weatherDay.timestamp);
        this.showReportDay = weatherDay;
      });
  }

  getWeatherWeek() {
    this.weatherService.getWeatherWeek()
      .subscribe((data: WeatherWeek) => {
        const weatherWeekData = { ...data };
        for (const weatherWeek of weatherWeekData.days) {
          weatherWeek.iconSrc = this.getWeatherIcon(weatherWeek.icon);
          weatherWeek.time = this.convertTime(weatherWeek.timestamp);
        }
        this.showReportWeek = weatherWeekData.days;
      });
  }

  getWeatherIcon(icon: WeatherDay["icon"]): string {
    switch (icon) {
      case 'clear-day': {
        return 'assets/weather/sunny.svg';
      }
      case 'clear-night': {
        return 'assets/weather/sunny.svg';
      }
      case 'sleet': {
        return 'assets/weather/rain.svg';
      }
      case 'rain': {
        return 'assets/weather/rain.svg';
      }
      case 'snow': {
        return 'assets/weather/snows.svg';
      }
      case 'wind': {
        return 'assets/weather/wind.svg';
      }
      case 'fog': {
        return 'assets/weather/hazy.svg';
      }
      case 'cloudy': {
        return 'assets/weather/cloudy.svg';
      }
      default: {
        return 'assets/weather/cloudy.svg';
      }
    }
  }

  convertTime(stamp: number): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(stamp * 1000, 'EEEE, MMMM d');
  }
}
