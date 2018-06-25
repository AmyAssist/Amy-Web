import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { weather } from '../Objects/weather';
import { weatherWeek } from '../Objects/weatherWeek';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  path: string;

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/weather/';
  }

  /*
    getting weather-Data for today.
  */
  getWeatherToday() {
    return this.http.get<weather>(this.path + 'today', httpOptions);
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow() {
    return this.http.get<weather>(this.path + 'tomorrow', httpOptions);
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek() {
    return this.http.get<weatherWeek>(this.path + 'week', httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
