import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { Weather } from '../../Objects/weather';
import { WeatherWeek } from '../../Objects/weatherWeek';
import { Location } from '../../Objects/location';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  selectedType: string;
  showReports: Weather[];

  locations: Location[];
  selectedLocation: string;

  constructor(private readonly weatherService: WeatherDataService) {
  }

  ngOnInit() {
    this.selectedType = 'today';
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
    switch (this.selectedType) {
      case 'today':
        this.getWeatherToday();
        break;
      case 'tomorrow':
        this.getWeatherTomorrow();
        break;
      case 'week':
        this.getWeatherWeek();
        break;
    }
  }

  getWeatherToday() {
    this.selectedType = 'today';
    this.weatherService.getWeatherToday()
      .subscribe((data: Weather) => {
        const weatherToday = { ...data };
        weatherToday.iconSrc = this.getWeatherIcon(weatherToday);
        weatherToday.time = this.convertTime(weatherToday.timestamp);
        this.showReports = [weatherToday];
      });
  }

  getWeatherTomorrow() {
    this.selectedType = 'tomorrow';
    this.weatherService.getWeatherTomorrow()
      .subscribe((data: Weather) => {
        const weatherTomorrow = { ...data };
        weatherTomorrow.iconSrc = this.getWeatherIcon(weatherTomorrow);
        weatherTomorrow.time = this.convertTime(weatherTomorrow.timestamp);
        this.showReports = [weatherTomorrow];
      });

  }

  getWeatherWeek() {
    this.selectedType = 'week';
    this.weatherService.getWeatherWeek()
      .subscribe((data: WeatherWeek) => {
        const weatherWeekData = { ...data };
        for (const weather of weatherWeekData.days) {
          weather.iconSrc = this.getWeatherIcon(weather);
          weather.time = this.convertTime(weather.timestamp);
        }
        this.showReports = weatherWeekData.days;
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
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(stamp * 1000, 'EEEE, MMMM d');
  }
}
