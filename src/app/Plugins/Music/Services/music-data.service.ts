import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { music } from '../Objects/music'
import { playlist } from '../Objects/playlist'


@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  path: string;

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/music/';
  }

  /*
    Getting the current Song.
  */
  getCurrentSong() {
    return this.http.get<music>(this.path + 'currentSong', httpOptions);
  }

  /*
    Getting the current Playlist.
  */
  getPlaylist() {
    return this.http.get<playlist>(this.path + 'playlist', httpOptions);
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music){
    this.http.post<music>(this.path + 'play', musicData, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
