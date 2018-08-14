import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../../Services/music-data.service';
import { Music } from '../../Objects/music';
import { Playlist } from '../../Objects/playlist';
import { Device } from '../../Objects/device';

/*
  Component for controlling the devices functionality of the spotify plugin. It recieves data from the REST-backend with a custom music-dataservice.

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

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

    this.deviceAll = new Array<Device>();
    this.getDevs();
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

  /*
    renaming a select device
  */
  setDeviceName(deviceID: string, newName: string) {
    this.musicService.setDeviceName(deviceID, newName).subscribe((data: string) => this.activeDevice = data);
    this.getDevs();
  }
}

