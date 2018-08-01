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

  constructor(private readonly musicService: MusicDataService) { }

  ngOnInit() {
<<<<<<< HEAD
=======


    this.musicService.setupPath();

    this.musicData = new Music;

    // array of songs from the current playlist for display
    this.playlistSongs = new Array<Music>();

    this.playlistAllFeatured = new Array<Playlist>();
    this.getPlaylistFeatured();

    this.playlistAllUser = new Array<Playlist>();
    this.getPlaylistUser();

    this.deviceAll = new Array<Device>();
    this.getDevs();

    this.searchResults = new Array<Music>();

    this.getVolume();
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
    this.musicService.search(searchValue, searchType, '5')
      .subscribe((data: Music[]) => this.searchResults = [...data]);
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
>>>>>>> bcfe3eff0a7c209008c18ab8ae0153a0538e7d66

  }
}
