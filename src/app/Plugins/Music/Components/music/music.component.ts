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

  /*
    setup bools for showing the whole setup
    and switching to the second part;
    link for the spotify authentification
  */
  setup = true;
  setupStage2 = false;
  spotifyLink: string;

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
  musicPlaylistData2: Playlist;

  // featured spotify-playlists
  playlistAllFeatured: Playlist[];

  // user spotify-playlists
  playlistAllUser: Playlist[];

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

  // bool to check if u paused or resumed the current song
  playing = false;

  // output of the search request
  searchOutput: string;

  // vars for volume slider
  volumeMax = 100;
  volumeMin = 0;
  volumeStep = 1;
  volumeValue = 0;

  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
    // this.setup = true;
    // this.setupStage2 = false;
    // this.playing = false;
    // this.playlist = false;

    console.log(this.musicService);
    this.musicData = new Music;

    // array of songs from the current playlist for display
    this.playlistSongs = new Array<Music>();

    this.playlistAllFeatured = new Array<Playlist>();

    /* testPlaylist, will be removed
    this.musicPlaylistData = new playlist("testplaylistFeatured");
    this.playlistAllFeatured = Array(
      this.musicPlaylistData,
      this.musicPlaylistData,
      this.musicPlaylistData,
      this.musicPlaylistData,
      this.musicPlaylistData
    );
    */


    this.playlistAllUser = new Array<Playlist>();

    /* testPlaylist, will be removed
    this.musicPlaylistData2 = new playlist("testplaylistUser");
    this.playlistAllUser = Array(
      this.musicPlaylistData2,
      this.musicPlaylistData2,
      this.musicPlaylistData2,
      this.musicPlaylistData2,
      this.musicPlaylistData2
    );
    */

    this.deviceAll = new Array<Device>();

    /* testDevices, will be removed
    this.deviceData = new device("testDevice");
    this.deviceAll = Array(
      this.deviceData,
      this.deviceData,
      this.deviceData,
      this.deviceData,
      this.deviceData
    ); */


    // this.getDevs();
    // this.getPlaylistFeatured();
    // this.getPlaylistUser();
    // this.getCurrentSong();
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

  /*
    getting the current playing song
  */
  getCurrentSong() {
    this.musicService.getCurrentSong()
      .subscribe((data: Music) => this.musicData = { ...data });
  }

  /*
    sending a search request
  */
  search(searchValue: string, searchType: string) {
    this.musicService.search(searchValue, searchType)
      .subscribe((data: string) => this.searchOutput = data);
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
  }

  /*
    returning to the previous song
  */
  setBack() {
    this.musicService.back()
      .subscribe();
  }

  /*
    setting the volume
  */
  changeVolume(volumeData: number) {
    this.musicService.setVolume(volumeData)
      .subscribe();
  }

  /*
    playing a single song typed in over the UI
  */
  playSong(artist: string, title: string) {
    this.musicData.artist = artist;
    this.musicData.title = title;
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

  playPlaylist(playlistNumber: number, playlistType: string) {
    this.musicService.playPlaylist(playlistNumber, playlistType).subscribe();
    // playlist => this.musicPlaylistData = playlist
    if (playlistType === 'user') {
      this.musicPlaylistData = this.playlistAllUser[playlistNumber];
    } else {
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
