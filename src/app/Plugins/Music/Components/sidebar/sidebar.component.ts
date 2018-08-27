import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../Services/music-data.service';
import { Music } from '../../Objects/music';
import { Playlist } from '../../Objects/playlist';
import { Device } from '../../Objects/device';

/*
  Component for controlling the playlists of the spotify plugin. It recieves data from the REST-backend with a custom music-dataservice.

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // music-object for the play-function
  musicData: Music;

  // bool for showing the current playlist
  playlist = false;

  // TODO: link with playing from current-song.component
  // bool to check if u paused or resumed the current song
  playing = false;

  /*
    -array of songs for the current playlist for display
    -temp playlist for the current playlist
  */
  playlistSongs: Music[];
  musicPlaylistData: Playlist;

  // featured spotify-playlists
  playlistAllFeatured: Playlist[];

  // user spotify-playlists
  playlistAllUser: Playlist[];

  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
    console.log(this.musicService);

    this.musicService.setupPath();

    this.musicData = new Music;

    // array of songs from the current playlist for display
    this.playlistSongs = new Array<Music>();

    this.playlistAllFeatured = new Array<Playlist>();

    this.playlistAllUser = new Array<Playlist>();

    this.getPlaylists();
  }

  /*
    playing a playlist out of the displayed ones
  */
  playPlaylistUser(id: number) {
    this.playPlaylist(id, 'user');
    // this.getCurrentSong();
  }

  playPlaylistFeatured(id: number) {
    this.playPlaylist(id, 'featured');
    // this.getCurrentSong();
  }

  playPlaylist(playlistNumber: number, playlistType: string) {
    this.musicService.playPlaylist(playlistNumber, playlistType).subscribe();
    // playlist => this.musicPlaylistData = playlist
    if (playlistType === 'user') {
      this.musicPlaylistData = this.playlistAllUser[playlistNumber];
    }
    else {
      this.musicPlaylistData = this.playlistAllFeatured[playlistNumber];
    }
    this.playlistSongs = this.musicPlaylistData.songs;
    this.playlist = true;
    this.playing = true;
  }

  getPlaylists() {
    this.getPlaylistFeatured();
    this.getPlaylistUser();
  }

  /*
    requesting spotifys featured playlists
  */
  getPlaylistFeatured() {
    this.musicService.getPlaylist('featured').subscribe((data: Playlist[]) => this.playlistAllFeatured = [...data]);
  }

  /*
    requesting the users own playlists
  */
  getPlaylistUser() {
    this.musicService.getPlaylist('user').subscribe((data: Playlist[]) => this.playlistAllUser = [...data]);
  }
}
