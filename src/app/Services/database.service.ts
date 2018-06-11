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

  constructor(private http: HttpClient) { }

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
    return this.http.get<clock[]>('http://localhost:8080/rest/clock/alarms');
  }

  /*
    Creating a new Alarm.
  */
  setNewAlarm(clockData: clock) {
    this.http.post<clock>('http://localhost:8080/rest/clock/alarms/new', clockData);
  }

  /*
    Getting the current Song.
  */
  getCurrentSong() {
    return this.http.get<music>('http://localhost:8080/rest/music/currentSong');
  }

  /*
    Getting the current Playlist.
  */
  getPlaylist() {
    return this.http.get<playlist>('http://localhost:8080/rest/music/playlist');
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music){
    this.http.post<music>('http://localhost:8080/rest/music/play', musicData);
  }

  /*
    getting weather-Data for today.
  */
  getWeatherToday() {
    return this.http.get<weather>('http://localhost:8080/rest/weather/today');
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow() {
  return this.http.get<weather>('http://localhost:8080/rest/weather/tomorrow');
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek() {
  return this.http.get<weatherWeek>('http://localhost:8080/rest/weather/week');
  }
}



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};