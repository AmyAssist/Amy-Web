import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../Services/music-data.service';
import { Music } from '../../Objects/music';
import { Playlist } from '../../Objects/playlist';

/*
  Component for controlling the current-song functionality of the spotify plugin. It recieves data from the REST-backend with a custom music-dataservice.

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-current-song',
  templateUrl: './current-song.component.html',
  styleUrls: ['./current-song.component.css']
})
export class CurrentSongComponent implements OnInit {

  // bool to check if u paused or resumed the current song
  playing = false;

  // vars for volume slider
  volumeMax = 100;
  volumeMin = 0;
  volumeStep = 1;
  volumeValue: number;

  // music-object for the play-function
  musicData: Music;

  // bool for showing the current playlist
  playlist = false;


  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
    this.musicService.setupPath();

    this.musicData = new Music;

    this.getVolume();
  }

  /*
    getting the current playing song
  */
  getCurrentSong() {
    this.musicService.getCurrentSong()
      .subscribe((data: Music) => this.musicData = { ...data });
  }
  /*
      resuming the paused song
    */
  setResume() {
    this.musicService.resume()
      .subscribe();
    this.playing = true;
  }

  /*
    pausing the playing song
  */
  setPause() {
    this.musicService.pause()
      .subscribe();
    this.playing = false;
  }

  /*
    skipping the playing song
  */
  setSkip() {
    this.musicService.skip()
      .subscribe();
    this.playing = true;
  }

  /*
    returning to the previous song
  */
  setBack() {
    this.musicService.back()
      .subscribe();
    this.playing = true;
  }

  /*
    setting the volume
  */
  changeVolume(volumeData: number) {
    this.musicService.setVolume(volumeData)
      .subscribe();
  }

  /*
  get the volume
  */

  getVolume() {
    this.musicService.getVolume().subscribe((data: number) => this.volumeValue = data);
  }
}
