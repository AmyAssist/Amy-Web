import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../../Services/weather-data.service';
import { WeatherReport } from '../../Objects/weatherReport';
import { WeatherReportInstant } from '../../Objects/weatherReportInstant';
import { WeatherReportDay } from '../../Objects/weatherReportDay';
import { Location } from '../../Objects/location';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  showReportInstant: WeatherReportInstant;
  showReportWeek: WeatherReportDay[];

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
      .subscribe((data: WeatherReport) => {
        const weatherReport = { ...data };
        weatherReport.current.temperature = Math.round(weatherReport.current.temperature);
        weatherReport.current.iconSrc = this.getWeatherIcon(weatherReport.current.iconType);
        weatherReport.current.precipIconSrc = this.getWeatherIcon(weatherReport.current.precipType);
        weatherReport.current.precipProbability = weatherReport.current.precipProbability * 100;
        weatherReport.current.time = this.convertDateTime(weatherReport.current.timestamp, weatherReport.timeZone);

        for (const weatherReportWeek of weatherReport.week.days) {
          weatherReportWeek.iconSrc = this.getWeatherIcon(weatherReportWeek.iconType);
          weatherReportWeek.precipIconSrc = this.getWeatherIcon(weatherReportWeek.precipType);
          weatherReportWeek.temperatureMax = Math.round(weatherReportWeek.temperatureMax);
          weatherReportWeek.temperatureMin = Math.round(weatherReportWeek.temperatureMin);
          weatherReportWeek.sunriseTime = this.convertTime(parseInt(weatherReportWeek.sunriseTime, 10), weatherReport.timeZone);
          weatherReportWeek.sunsetTime = this.convertTime(parseInt(weatherReportWeek.sunsetTime, 10), weatherReport.timeZone);
          weatherReportWeek.precipProbability = weatherReportWeek.precipProbability * 100;
          weatherReportWeek.time = this.convertDateTime(weatherReportWeek.timestamp, weatherReport.timeZone);
        }
        this.showReportInstant = weatherReport.current;
        this.showReportWeek = weatherReport.week.days;
      });
  }

  getWeatherIcon(iconType: WeatherReportDay['iconType']): string {
    switch (iconType) {
      case 'clear-day': {
        return 'assets/weather/sunny.svg';
      }
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
      case 'cloudy': {
        return 'assets/weather/cloudy.svg';
      }
      case 'clear-night': {
        return 'assets/weather/sunny.svg';
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
      default: {
        return 'assets/weather/rain.svg';
      }
    }
  }

  convertTime(stamp: number, timeZone: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(stamp * 1000, 'HH:mm', timeZone);
  }

  convertDateTime(stamp: number, timeZone: string): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(stamp * 1000, 'EEEE, MMMM d', timeZone);
  }
}
