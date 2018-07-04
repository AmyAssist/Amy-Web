import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { music } from '../Objects/music';
import { playlist } from '../Objects/playlist';


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

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/music/';
  }

  /*
    Getting the current Song.
  */
  getCurrentSong() {
    return this.http.get<music>(this.path + 'currentSong', this.httpOptions);
  }

  /*
    Getting the current Playlist.
  */
  getPlaylist() {
    return this.http.get<playlist>(this.path + 'playlist', this.httpOptions);
  }

  /*
    giving a command to play a song.
  */
  playSong(musicData: music){
    this.http.post<music>(this.path + 'play', musicData, this.httpOptions);
  }
}
