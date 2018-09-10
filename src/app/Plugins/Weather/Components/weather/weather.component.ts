import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { Weather } from '../../Objects/weather';
import { WeatherDay } from '../../Objects/weatherDay';
import { Location } from '../../Objects/location';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  showReportWeek: WeatherDay[];
  showReport: Weather;

  locations: Location[];
  selectedLocation: string;
  locationSelected = false;

  constructor(private readonly weatherService: WeatherDataService) {
  }

  ngOnInit() {
    this.weatherService.getAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
      if (data.length > 0) {
        this.selectLocation(this.locations[0]);
      }
    });
  }

  public changeLocation(event): void {
    this.selectLocation(event.value);
  }

  public selectLocation(location: Location): void {
    this.locationSelected = true;
    this.selectedLocation = location.name;
    this.getWeatherReport(location);
  }

  getWeatherReport(location: Location) {
    this.weatherService.getWeatherReport(location.persistentId)
      .subscribe((data: Weather) => {
        const weather = { ...data };
        weather.current.temperatureNow = Math.round(weather.current.temperatureNow);
        weather.current.iconSrc = this.getWeatherIcon(weather.current.iconType);
        weather.current.precipIconSrc = this.getWeatherIcon(weather.current.precipType);
        weather.current.precipProbability = weather.current.precipProbability * 100;
        weather.current.time = this.convertTime(weather.current.timestamp, weather.timeZone);

        for (const weatherWeek of weather.week.days) {
          weatherWeek.iconSrc = this.getWeatherIcon(weatherWeek.iconType);
          weatherWeek.precipIconSrc = this.getWeatherIcon(weatherWeek.precipType);
          weatherWeek.temperatureMax = Math.round(weatherWeek.temperatureMax);
          weatherWeek.temperatureMin = Math.round(weatherWeek.temperatureMin);
          weatherWeek.precipProbability = weatherWeek.precipProbability * 100;
          weatherWeek.time = this.convertTime(weatherWeek.timestamp, weather.timeZone);
        }
        this.showReport = weather;
        this.showReportWeek = weather.week.days;
      });
  }

  getWeatherIcon(iconType: WeatherDay['iconType']): string {
    switch (iconType) {
      case 'clear-day': {
        return 'assets/weather/sunny.svg';
      }
      case 'partly-cloudy-day': {
        return 'assets/weather/cloudy.svg';
      }
      case 'clear-night': {
        return 'assets/weather/sunny.svg';
      }
      case 'partly-cloudy-night': {
        return 'assets/weather/cloudy.svg';
      }
      case 'sleet': {
        return 'assets/weather/sleet.svg';
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
        return 'assets/weather/rain.svg';
      }
    }
  }

  convertTime(stamp: number, timeZone: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(stamp * 1000, 'EEEE, MMMM d');
  }
}
