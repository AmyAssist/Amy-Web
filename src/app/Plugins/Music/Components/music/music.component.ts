import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MusicDataService } from '../../Services/music-data.service';
import { music } from '../../Objects/music'
import { playlist } from '../../Objects/playlist'

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  musicData: music;
  musicPlaylistData: playlist;
  playlistSongs: music[];
  song: boolean;
  playlist: boolean;
  
  constructor(private databaseService: MusicDataService) { }

  ngOnInit() {
    this.song = false;
    this.playlist = false;
    this.musicData = new music;
    this.musicPlaylistData = new playlist;
    this.playlistSongs = new Array<music>();
  }

  getCurrentSong() {
    this.song = true;
    this.playlist = false;
    this.databaseService.getCurrentSong()
    .subscribe((data : music) => this.musicData = { ...data});
  }

  getPlaylist() {
    this.song = false;
    this.playlist = true;
    this.databaseService.getPlaylist()
    .subscribe((data : playlist) => this.musicPlaylistData = { ...data});
    this.playlistSongs = this.musicPlaylistData.songs;
  }

  playSong(artist: string, title: string) {
    this.musicData.artist = artist;
    this.musicData.title = title;
    this.databaseService.playSong(this.musicData);
    this.song = true;
    this.playlist = false;
  }
}