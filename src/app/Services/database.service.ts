import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { clock } from '../Objects/clock'
import { music } from '../Objects/music'
import { weather } from '../Objects/weather'
import { command } from '../Objects/command'

/*
    Service for providing and receiving data from the REST interface.
*/
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  /*
    Getting the current command for the web application.
  */
  getCommand(commandData: command): Observable<command> {
    return this.http.post<command>('rest/command', commandData, httpOptions);
  }

  /*
    providing and getting clock-Data from the REST-Interface.
  */
  getClock(clockData: clock): Observable<clock> {
    return this.http.post<clock>('rest/alarmclock', clockData, httpOptions);
  }

  /*
    providing and getting music-Data from the REST-Interface.
  */
  getMusic(musicData: music): Observable<music> {
    return this.http.post<music>('rest/music', musicData, httpOptions);
  }

  /*
    providing and getting weather-Data from the REST-Interface.
  */
  getWeather(weatherData: weather): Observable<weather> {
    return this.http.post<weather>('rest/weather', weatherData, httpOptions);
  }
}



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};