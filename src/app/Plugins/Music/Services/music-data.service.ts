import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
import { music } from '../Objects/music';
import { playlist } from '../Objects/playlist';
import { device } from '../Objects/device';

/*
  service for exchanging data between the spotify plugin and the music component
  
  @author: Tobias Siemonsen
*/
@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  path: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

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
  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/music/';
  }

  /*
    Returns a login link to a personal spotify Account
  */
  setInit(clientID: string, clientSecret: string){
    clientID = clientID.trim();
    clientSecret = clientSecret.trim();

    let params = new HttpParams();
    params = params.append('clientID', clientID);
    params = params.append('clientSecret', clientSecret);

    return this.http.post(this.path + 'init', null, {params: params}).pipe(
      catchError(this.handleError));
  }

  setToken(token: string){
    return this.http.post(this.path + 'token/' + token, null).pipe(
      catchError(this.handleError));
  }

  getDevices(){
    return this.http.get<device[]>(this.path + 'getDevices', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Returns the device that is selected
  */
  setDevice(deviceId: number){
    return this.http.post(this.path + 'setDevice/' + deviceId.toString(), null).pipe(
      catchError(this.handleError));
  }

  /*
    Getting the current Song.
  */
  getCurrentSong(){
    return this.http.get<music>(this.path + 'currentSong', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  search(searchValue: string, searchType: string){
    let params = new HttpParams().set('type', searchType);

    return this.http.post(this.path + 'search/' + searchValue, null, {params: params}).pipe(
      catchError(this.handleError));
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music): Observable<music>{
    let params = new HttpParams().set('type', 'track');

    return this.http.post<music>(this.path + 'play', musicData, {params: params}).pipe(
      catchError(this.handleError));
  }

  /*
    giving a command to play a playlist.
  */
  playPlaylist(playlistData: Number, playlistType: string): Observable<playlist>{
    let params = new HttpParams();
    params = params.append('songNumber', playlistData.toString());
    params = params.append('type', playlistType);

    return this.http.post<playlist>(this.path + 'play', null, {params: params}).pipe(
      catchError(this.handleError));
  }

  resume(){
    return this.http.post<playlist>(this.path + 'resume', null).pipe(
      catchError(this.handleError));
  }

  pause(){
    return this.http.post<playlist>(this.path + 'pause', null).pipe(
      catchError(this.handleError));
  }

  skip(){
    return this.http.post<playlist>(this.path + 'skip', null).pipe(
      catchError(this.handleError));
  }

  back(){
    return this.http.post<playlist>(this.path + 'back', null).pipe(
      catchError(this.handleError));
  }

  setVolume(volumeData: number){
    return this.http.post<playlist>(this.path + 'volume/' + volumeData, null).pipe(
      catchError(this.handleError));
  }

  /*
    Getting the current Playlist.
    param: type, decides which type of playlists will be loaded, featured or user
  */
  getPlaylist(type: string){
    return this.http.post<playlist[]>(this.path + 'playlists/' + type, null).pipe(
      catchError(this.handleError));
  }
}
