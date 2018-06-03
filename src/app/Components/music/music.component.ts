import { Component, OnInit } from '@angular/core';
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
  
  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.musicData = new music;
    this.musicPlaylistData = new Array<music>();
  }

  getCurrentSong() {
    this.databaseService.getCurrentSong()
    .subscribe((data : music) => this.musicData = { ...data});
  }

  getPlaylist() {
    this.databaseService.getPlaylist()
    .subscribe((data : music[]) => this.musicPlaylistData = { ...data});
  }

  /*
  playSong(){}
  */
}
