import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../Services/music-data.service';
import { MusicDataTransferService } from '../../Services/music-data-transfer.service';
import { Music } from '../../Objects/music';
import { Album } from '../../Objects/album';
import { Artist } from '../../Objects/artist';
import { Playlist } from '../../Objects/playlist';
import { Device } from '../../Objects/device';

/*
  Component for controlling the play functionality of the spotify plugin.
  It recieves data from the REST-backend with a custom music-dataservice.

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

  activeType: string;
  searchType: string;

  playlistSongs: Music[];
  musicPlaylistData: Playlist;

  searchResults: any[];

  searchResultSong: Music[];
  searchResultAlbum: Album[];
  searchResultArtist: Artist[];
  searchResultPlaylist: Playlist[];


  constructor(private readonly musicService: MusicDataService, private readonly musicTransService: MusicDataTransferService) { }

  ngOnInit() {
    this.musicData = new Music;

    this.searchResultSong = new Array<Music>();
    this.searchResultAlbum = new Array<Album>();
    this.searchResultArtist = new Array<Artist>();
    this.searchResultPlaylist = new Array<Playlist>();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.musicTransService.sendMessage('Now playing an objekt.');
  }

  clearMessage(): void {
    // clear message
    this.musicTransService.clearMessage();
  }

  /*
    sending a search request
  */
  search(searchValue: string, type: string) {
    if (type === 'track') {
      this.searchSong(searchValue, type);
    } else if (type === 'album') {
      this.searchAlbum(searchValue, type);
    } else if (type === 'artist') {
      this.searchArtist(searchValue, type);
    } else if (type === 'playlist') {
      this.searchPlaylist(searchValue, type);
    }
  }

  /*
    search-request for Songs
  */
  searchSong(searchValue: string, searchType: string) {
    this.musicService.search(searchValue, searchType, '7')
      .subscribe((data: Music[]) => this.searchResults = [...data]);
    this.searchType = 'track';
  }

  /*
    search-request for Artists
  */
  searchArtist(searchValue: string, searchType: string) {
    this.musicService.search(searchValue, searchType, '7')
      .subscribe((data: Artist[]) => this.searchResults = [...data]);
    this.searchType = 'artist';
  }

  /*
    search-request for Albums
  */
  searchAlbum(searchValue: string, searchType: string) {
    this.musicService.search(searchValue, searchType, '7')
      .subscribe((data: Album[]) => this.searchResults = [...data]);
    this.searchType = 'album';
  }

  /*
    search-request for Playlists
  */
  searchPlaylist(searchValue: string, searchType: string) {
    this.musicService.search(searchValue, searchType, '7')
      .subscribe((data: Playlist[]) => this.searchResults = [...data]);
    this.searchType = 'playlist';
  }

  /*
    play request for one item out of the searched items,
    depending on the type of item a different method gets called
  */
  playSearchResults(id: number) {
    if (this.searchType === 'track') {
      this.musicService.playSong(id).subscribe();
      this.musicTransService.setImageUrl(this.searchResults[id].imageUrl);
      this.musicTransService.imageChanged = true;
    } else if (this.searchType === 'artist') {
      this.musicService.playArtist(id).subscribe();
      this.musicTransService.setImageUrl(this.searchResults[id].imageUrl);
      this.musicTransService.imageChanged = true;
    } else if (this.searchType === 'album') {
      this.musicService.playAlbum(id).subscribe();
      this.musicTransService.setImageUrl(this.searchResults[id].imageUrl);
      this.musicTransService.imageChanged = true;
    } else if (this.searchType === 'playlist') {
      this.musicService.playPlaylist(id, 'search').subscribe();
      this.musicTransService.setImageUrl(this.searchResults[id].imageUrl);
      this.musicTransService.imageChanged = true;
    }
    this.sendMessage();
  }
}
