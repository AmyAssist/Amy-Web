import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DatabaseService } from '../../Services/database.service';
import { music } from '../../Objects/music'

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  musicData: music;
  musicPlaylistData: music[];
  song: boolean;
  playlist: boolean;
  
  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.song = false;
    this.playlist = false;
    this.musicData = new music;
    this.musicPlaylistData = new Array<music>();
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
    .subscribe((data : music[]) => this.musicPlaylistData = { ...data});
  }

  playSong(artist: string, titel: string) {
    this.musicData.artist = artist;
    this.musicData.titel = titel;
    this.databaseService.playSong(this.musicData);
    this.song = true;
    this.playlist = false;
  }
}
