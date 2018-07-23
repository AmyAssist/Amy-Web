import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { NavPath } from '../../Objects/navPath';
import { BestTransportResult } from '../../Objects/bestTransportResult';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navPathData: NavPath;
  from: string;
  to: string;
  way: string;
  timeString: string;
  timeDate: Date;
  travelMode1: string;
  travelMode2: string;
  showWay: boolean;
  showMode: boolean;
  showWhen: boolean;
  whenTime: string;
  whenTimeDate: Date;
  bestTransport: BestTransportResult;
  Time: string;

  resultSummary: string;
  resultMode: string;
  resultDistance: string;
  resultDuration: string;
  resultArrivalTime: Date;
  resultDepartureTime: Date;
  resultStartAddress: string;
  resultEndAddress: string;

  constructor(private readonly navigationService: NavigationDataService) { }

  ngOnInit() {
    console.log(this.navigationService);
    this.showWay = false;
    this.showWhen = false;
    this.showMode = false;
    this.navPathData = new NavPath();
    this.bestTransport = new BestTransportResult();
  }

  async fromToWay(from: string, to: string, date: string, hour: number, minute: number) {
    this.createRoute(from, to, date, hour, minute);
    this.navPathData.setTravelmode(this.travelMode1);
    this.navigationService.fromTo(this.navPathData).subscribe((data: BestTransportResult) => this.bestTransport = { ...data });
    this.showWay = true;
    this.showWhen = false;
    this.showMode = false;
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    this.calcResult();
  }

  async bestType(from: string, to: string, date: string, hour: number, minute: number) {
    this.createRoute(from, to, date, hour, minute);
    this.navigationService.best(this.navPathData).subscribe((data: BestTransportResult) => this.bestTransport = { ...data });
    this.showWay = false;
    this.showWhen = false;
    this.showMode = true;
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    this.calcResult();
  }

  searchWhen(from: string, to: string, date: string, hour: number, minute: number) {
    this.createRoute(from, to, date, hour, minute);
    this.navPathData.setTravelmode(this.travelMode2);
    this.navigationService.when(this.navPathData).subscribe((data: string) => this.whenTime = data);
    this.whenTimeDate = new Date(this.whenTime);
    this.showWay = false;
    this.showWhen = true;
    this.showMode = false;
  }

  setDate(time: string) {
    this.Time = time;
    console.log(this.Time);
  }

  createRoute(from: string, to: string, date: string, hour: number, minute: number) {
    this.navPathData.setOrigin(from);
    this.navPathData.setDestination(to);
    this.timeDate = new Date(date);
    this.timeDate.setHours(hour);
    this.timeDate.setMinutes(minute);
    this.navPathData.setTime(this.timeDate);
  }

  calcResult() {
    
    this.resultSummary = this.bestTransport.route.summary;
    if (this.bestTransport.mode.toString() === 'DRIVING') {
      this.resultMode = 'car';
    } else if (this.bestTransport.mode.toString() === 'TRANSIT') {
      this.resultMode = 'transit';
    } else if (this.bestTransport.mode.toString() === 'BICYCLING') {
      this.resultMode = 'bicycle';
    }
    this.resultDistance = this.bestTransport.route.legs[0].distance.humanReadable;
    this.resultDuration = this.bestTransport.route.legs[0].duration.humanReadable;
    this.resultArrivalTime = this.bestTransport.route.legs[0].arrivalTime;
    this.resultDepartureTime = this.bestTransport.route.legs[0].departureTime;
    this.resultStartAddress = this.bestTransport.route.legs[0].startAddress;
    this.resultEndAddress = this.bestTransport.route.legs[0].endAddress;
  }
}
