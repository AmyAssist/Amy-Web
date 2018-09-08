import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../Services/music-data.service';

/*
  Component for controlling the authenticaation of the spotify plugin.
  It recieves data from the REST-backend with a custom music-dataservice.

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  /*
    setup bools for showing the whole setup
    and switching to the second part;
    link for the spotify authentification
  */
  setup = true;
  setupStage2 = false;
  spotifyLink: string;


  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
    console.log(this.musicService);
    // this.musicService.setupPath();
  }

  /*
    Method for the initialisation of the spotify-connection
  */
  setInit(clientID: string, clientSecret: string) {
    this.setupStage2 = true;
    this.musicService.setInit(clientID, clientSecret)
      .subscribe((data: string) => this.spotifyLink = data);
  }

  /*
    method for setting the access-token for the spotify-connection
  */
  setToken(token: string) {
    this.musicService.setToken(token)
      .subscribe();
    this.setup = false;
    this.setupStage2 = false;
  }
}
