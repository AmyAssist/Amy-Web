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
    providing and getting clock-Data from the REST-Interface.
  */
  getClock(): Observable<clock[]> {
    return this.http.get<clock[]>('rest/Alarms', httpOptions);
  }

  /*
    Getting the current Song.
  */
  getCurrentSong(): Observable<music> {
    return this.http.get<music>('rest/music/currentSong', httpOptions);
  }

  /*
    Getting the current Playlist.
  */
  getPlaylist(): Observable<music[]> {
  return this.http.get<music[]>('rest/music/playlist', httpOptions);
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music){
    this.http.post<music>('rest/music/play', musicData, httpOptions);
  }

  /*
    getting weather-Data for today.
  */
  getWeatherToday(): Observable<weather> {
    return this.http.get<weather>('rest/weather/Today', httpOptions);
  }

  /*
    getting weather-Data for tomorrow.
  */
  getWeatherTomorrow(): Observable<weather> {
  return this.http.get<weather>('rest/weather/Tomorrow', httpOptions);
  }

  /*
    getting weather-Data for the whole week.
  */
  getWeatherWeek(): Observable<weather[]> {
  return this.http.get<weather[]>('rest/weather/Week', httpOptions);
  }
}



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};