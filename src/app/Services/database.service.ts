import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { clock } from '../Objects/clock'
import { music } from '../Objects/music'
import { playlist } from '../Objects/playlist'
import { weather } from '../Objects/weather'
import { command } from '../Objects/command'
import { weatherWeek } from '../Objects/weatherWeek';

/*
    Service for providing and receiving data from the REST interface.
*/
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  path: string;

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/';
  }

  /*
    Getting the current command for the web application.
  */
 /*
  getCommand(commandData: command): Observable<command> {
    return this.http.post<command>('rest/command', commandData, httpOptions);
  } */

  /*
    Getting all Alarms.
  */
  getAlarms() {
    return this.http.get<clock[]>(this.path + 'clock/alarms', httpOptions);
  }

  /*
    Creating a new Alarm.
  */
  setNewAlarm(clockData: clock) {
    this.http.post<clock>(this.path + 'clock/alarms/new', clockData, httpOptions);
  }

  /*
    Getting the current Song.
  */
  getCurrentSong() {
    return this.http.get<music>(this.path + 'music/currentSong', httpOptions);
  }

  /*
    Getting the current Playlist.
  */
  getPlaylist() {
    return this.http.get<playlist>(this.path + 'music/playlist', httpOptions);
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music){
    this.http.post<music>(this.path + 'music/play', musicData, httpOptions);
  }

  /*
    getting weather-Data for today.
  */
  getWeatherToday() {
    return this.http.get<weather>(this.path + 'weather/today', httpOptions);
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow() {
  return this.http.get<weather>(this.path + 'weather/tomorrow', httpOptions);
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek() {
  return this.http.get<weatherWeek>(this.path + 'weather/week', httpOptions);
  }
}



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};