import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../Services/music-data.service';
import { Music } from '../../Objects/music';
import { Playlist } from '../../Objects/playlist';
import { Device } from '../../Objects/device';

/*
  Component for controlling the play functionality of the spotify plugin. It recieves data from the REST-backend with a custom music-dataservice.

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  // music-object for the play-function
  musicData: Music;

  // bool for showing the current playlist
  playlist = false;
  playing = false;
  /*
    -array of songs for the current playlist for display
    -temp playlist for the current playlist
  */
  playlistSongs: Music[];
  musicPlaylistData: Playlist;

  searchResult: Music;

  // search rsults
  searchResults: Music[];

  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
    console.log(this.musicService);

    this.musicService.setupPath();

    this.musicData = new Music;

    this.searchResults = new Array<Music>();

    this.searchResults = new Array<Music>();
  }

  /*
  sending a search request
*/
  search(searchValue: string, searchType: string) {
    this.musicService.search(searchValue, searchType, '5')
      .subscribe((data: Music[]) => this.searchResults = [...data]);
  }

  /*
    playing a single song typed in over the UI
  */
  playSong(artist: string, title: string) {
    this.musicData.artistName = artist;
    this.musicData.name = title;
    this.musicService.playSong(this.musicData).subscribe();
    this.playlist = false;
    this.playing = true;
  }

  playSearchResults(id: number) {
    this.musicService.playPlaylist(id, 'search').subscribe();
    this.playing = true;
  }
}
