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
 /*
  getCommand(commandData: command): Observable<command> {
    return this.http.post<command>('rest/command', commandData, httpOptions);
  } */

  /*
    Getting all Alarms.
  */
  getAlarms() {
    return this.http.get<clock[]>('http://localhost:8080/rest/Alarms', httpOptions);
  }

  /*
    Getting the current Song.
  */
  getCurrentSong() {
    return this.http.get<music>('http://localhost:8080/rest/music/currentSong', httpOptions);
  }

  /*
    Getting the current Playlist.
  */
  getPlaylist() {
  return this.http.get<music[]>('http://localhost:8080/rest/music/playlist', httpOptions);
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music){
    this.http.post<music>('http://localhost:8080/rest/music/play', musicData, httpOptions);
  }

  /*
    getting weather-Data for today.
  */
  getWeatherToday() {
    return this.http.get<weather>('http://localhost:8080/rest/weather/Today', httpOptions);
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow() {
  return this.http.get<weather>('http://localhost:8080/rest/weather/Tomorrow', httpOptions);
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek() {
  return this.http.get<weather[]>('http://localhost:8080/rest/weather/Week', httpOptions);
  }
}



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};