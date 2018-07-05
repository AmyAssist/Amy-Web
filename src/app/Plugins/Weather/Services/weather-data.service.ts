import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
import { weather } from '../Objects/weather';
import { weatherWeek } from '../Objects/weatherWeek';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  path: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/weather/';
  }
 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  /*
    getting weather-Data for today.
  */
  getWeatherToday() {
    return this.http.get<weather>(this.path + 'today', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow() {
    return this.http.get<weather>(this.path + 'tomorrow', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek() {
    return this.http.get<weatherWeek>(this.path + 'week', this.httpOptions).pipe(
      catchError(this.handleError));
  }
}
