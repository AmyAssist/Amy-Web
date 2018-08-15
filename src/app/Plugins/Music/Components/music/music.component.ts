import { Component, OnInit, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MusicDataService } from '../../Services/music-data.service';
import { Music } from '../../Objects/music';
import { Playlist } from '../../Objects/playlist';
import { Device } from '../../Objects/device';

/*
  Component for controlling the spotify plugin. It recieves data from the REST-backend with a custom music-dataservice.

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  isMobileView: boolean;
  screenWidth: number;

  constructor(private readonly musicService: MusicDataService) {
    this.musicService.setupPath();
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }


}
