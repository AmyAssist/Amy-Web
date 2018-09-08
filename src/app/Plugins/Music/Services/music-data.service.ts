import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Music } from '../Objects/music';
import { Album } from '../Objects/album';
import { Artist } from '../Objects/artist';
import { Playlist } from '../Objects/playlist';
import { Device } from '../Objects/device';
import { BackendResolver } from '../../../Services/backendResolver.service';
import { identifierModuleUrl } from '@angular/compiler';

/*
  service for exchanging data between the spotify plugin and the music component

  @author: Tobias Siemonsen, Lars Buttgereit
*/
@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  get path() {
    return this.backend.backendURL.getValue() + 'music/';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {}

  /*
    Returns a login link to a personal spotify Account
  */
  setInit(clientID: string, clientSecret: string) {
    clientID = clientID.trim();
    clientSecret = clientSecret.trim();

    let params = new HttpParams();
    params = params.append('clientID', clientID);
    params = params.append('clientSecret', clientSecret);

    return this.http.post(`${this.path}init`, null, { params }).pipe(
      catchError(this.handleError));
  }

  setToken(token: string) {
    return this.http.post(`${this.path}token/` + token, null).pipe(
      catchError(this.handleError));
  }

  getDevices() {
    return this.http.get<Device[]>(`${this.path}getDevices`, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Returns the device that is selected
  */
  setDevice(deviceId: string) {
    return this.http.post(`${this.path}setDevice/` + deviceId, null).pipe(
      catchError(this.handleError));
  }

  setDeviceName(deviceUri: string, deviceName: string) {
    let params = new HttpParams();
    params = params.append('uri', deviceUri);
    params = params.append('newName', deviceName);

    return this.http.post(`${this.path}setDeviceName`, null, { params }).pipe(
      catchError(this.handleError));
  }

  search(searchValue: string, searchType: string, limit: string) {
    const params = new HttpParams().set('type', searchType);
    params.append('limit', limit);
    return this.http.get(`${this.path}search/${searchType}/${searchValue}`, { params }).pipe(
      catchError(this.handleError));
  }

  /*
    giving a command to play a song.
  */
  playSong(musicNumber: number) {
    let params = new HttpParams();
    params = params.append('index', musicNumber.toString());
    return this.http.post(`${this.path}play/track`, null, { params }).pipe(
      catchError(this.handleError));
  }

  playAlbum(albumNumber: number) {
    let params = new HttpParams();
    params = params.append('index', albumNumber.toString());
    return this.http.post(`${this.path}play/album`, null, { params }).pipe(
      catchError(this.handleError));
  }

  playArtist(artistNumber: number) {
    let params = new HttpParams();
    params = params.append('index', artistNumber.toString());
    return this.http.post(`${this.path}play/artist`, null, { params }).pipe(
      catchError(this.handleError));
  }

  /*
    giving a command to play a playlist.
  */
  playPlaylist(playlistData: number, playlistType: string): Observable<Playlist> {
    let params = new HttpParams();
    params = params.append('songNumber', playlistData.toString());
    params = params.append('type', playlistType);

    return this.http.post<Playlist>(`${this.path}play`, null, { params }).pipe(
      catchError(this.handleError));
  }

  resume() {
    return this.http.post<Playlist>(`${this.path}resume`, null).pipe(
      catchError(this.handleError));
  }

  pause() {
    return this.http.post<Playlist>(this.path + 'pause', null).pipe(
      catchError(this.handleError));
  }

  skip() {
    return this.http.post<Playlist>(this.path + 'skip', null).pipe(
      catchError(this.handleError));
  }

  back() {
    return this.http.post<Playlist>(this.path + 'back', null).pipe(
      catchError(this.handleError));
  }

  /*
    Getting the current Song.
  */
  getCurrentSong() {
    return this.http.get<Music>(`${this.path}currentSong`, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  setVolume(volumeData: number) {
    return this.http.post<Playlist>(this.path + 'volume/' + volumeData, null).pipe(
      catchError(this.handleError));
  }

  getVolume() {
    return this.http.get<number>(this.path + 'getVolume', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Getting the current Playlist.
    param: type, decides which type of playlists will be loaded, featured or user
  */
  getPlaylist(type: string) {
    const params = new HttpParams().set('type', '10');
    return this.http.get(`${this.path}playlists/${type}`, { params }).pipe(
      catchError(this.handleError));
  }
}
