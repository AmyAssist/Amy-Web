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
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  // TODO: link with playing from current-song.component
  // bool to check if u paused or resumed the current song
  playing = false;

  // music-object for the play-function
  musicData: Music;

  // bool for showing the current playlist
  playlist = false;

  /*
    -array of songs for the current playlist for display
    -temp playlist for the current playlist
  */
  playlistSongs: Music[];
  musicPlaylistData: Playlist;

  searchResult: Music;

  // featured spotify-playlists
  playlistAllFeatured: Playlist[];

  // user spotify-playlists
  playlistAllUser: Playlist[];

  // search rsults
  searchResults: Music[];
  /*
    -single-Device for testing
    -all Devices the user has
    -the currently activ Device and its ID
  */
  deviceData: Device;
  deviceAll: Device[];
  activeDevice: string;
  activeDeviceID: string;
  renameDeviceID: string;
  activeType: string;

  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
    console.log(this.musicService);

    this.musicService.setupPath();

    this.musicData = new Music;

    // array of songs from the current playlist for display
    this.playlistSongs = new Array<Music>();

    this.playlistAllFeatured = new Array<Playlist>();

    this.playlistAllUser = new Array<Playlist>();

    this.deviceAll = new Array<Device>();
    this.getDevs();

    this.searchResults = new Array<Music>();

    console.log(this.musicService);

    this.musicService.setupPath();

    this.musicData = new Music;

    // array of songs from the current playlist for display
    this.playlistSongs = new Array<Music>();

    this.playlistAllFeatured = new Array<Playlist>();

    this.playlistAllUser = new Array<Playlist>();

    this.deviceAll = new Array<Device>();
    this.getDevs();

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

  playSearchResults(id: number) {
    this.musicService.playPlaylist(id, 'search').subscribe();
    this.playing = true;
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

  /*
    getting all the available devices
  */
  getDevs() {
    this.musicService.getDevices().subscribe((data: Device[]) => this.deviceAll = [...data]);
  }

  /*
    selecting a device to play music on
  */
  setDevice(deviceID: string) {
    this.musicService.setDevice(deviceID).subscribe((data: string) => this.activeDevice = data);
  }

  setDeviceName(deviceID: string, newName: string) {
    this.musicService.setDeviceName(deviceID, newName).subscribe((data: string) => this.activeDevice = data);
    this.getDevs();
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
