import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Weather } from '../Objects/weather';
import { WeatherWeek } from '../Objects/weatherWeek';
import { Location } from '../Objects/location';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  get path() {
    return this.backend.backendURL.getValue();
  }
  pathRegistry: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpPlainTextHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  constructor(private readonly http: HttpClient, private readonly backend: BackendResolver) { }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  /*
    getting weather-Data for today.
  */
  getWeatherToday() {
    return this.http.get<Weather>(this.path + 'weather/today', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow() {
    return this.http.get<Weather>(this.path + 'weather/tomorrow', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek() {
    return this.http.get<WeatherWeek>(this.path + 'weather/week', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    gets all loctaions from the registry
  */
  getAllLocations() {
    return this.http.get<Location[]>(this.path + 'registry/location/all').pipe(
      catchError(this.handleError));
  }

  /*
  sends the selected location to amy
  */
  sendLocation(id: number) {
    this.http.put(this.path + 'weather/setLocation', String(id), this.httpPlainTextHeader).pipe(
      catchError(this.handleError)).subscribe();

  }
}
