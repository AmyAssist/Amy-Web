import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { NavPath } from '../../Objects/navPath';
import { BestTransportResult } from '../../Objects/bestTransportResult';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements OnInit {

  navPathData: NavPath;
  from: string;
  to: string;
  way: string;
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

  transit: boolean;
  resultSummary: string;
  resultMode: string;
  resultDistance: string;
  resultDuration: string;
  resultArrivalTime: string;
  resultDepartureTime: string;
  resultStartAddress: string;
  resultEndAddress: string;

  constructor(private readonly navigationService: NavigationDataService) { }

  ngOnInit() {
    console.log(this.navigationService);
    this.navigationService.setupPath();
    this.showWay = false;
    this.showWhen = false;
    this.showMode = false;
    this.transit = false;
    this.navPathData = new NavPath();
    this.bestTransport = new BestTransportResult();
  }

  async fromToWay(from: string, to: string, date: string) {
    this.createRoute(from, to, date);
    this.navPathData.setTravelmode(this.travelMode1);
    this.navigationService.fromTo(this.navPathData).subscribe((data: BestTransportResult) => this.bestTransport = { ...data });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    this.calcResult();
    this.showWay = true;
    this.showWhen = false;
    this.showMode = false;
  }

  async bestType(from: string, to: string, date: string) {
    this.createRoute(from, to, date);
    this.navigationService.best(this.navPathData).subscribe((data: BestTransportResult) => this.bestTransport = { ...data });
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    this.calcResult();
    this.showWay = false;
    this.showWhen = false;
    this.showMode = true;
  }

  async searchWhen(from: string, to: string, date: string) {
    this.createRoute(from, to, date);
    this.navPathData.setTravelmode(this.travelMode2);
    this.navigationService.when(this.navPathData).subscribe((data: string) => this.whenTime = data);
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    console.log(this.whenTime);
    this.whenTimeDate = new Date(this.whenTime);
    this.showWay = false;
    this.showWhen = true;
    this.showMode = false;
  }

  createRoute(from: string, to: string, date: string) {
    this.navPathData.setOrigin(from);
    this.navPathData.setDestination(to);
    this.timeDate = new Date(date);
    this.navPathData.setTime(this.timeDate.toISOString());
  }

  calcResult() {
    if (this.bestTransport.mode.toString() === 'DRIVING') {
      this.resultMode = 'car';
      this.transit = false;
    } else if (this.bestTransport.mode.toString() === 'TRANSIT') {
      this.resultMode = 'transit';
      this.transit = true;
    } else if (this.bestTransport.mode.toString() === 'BICYCLING') {
      this.resultMode = 'bicycle';
      this.transit = false;
    }

    this.resultDistance = this.bestTransport.route.legs[0].distance.humanReadable;
    this.resultDuration = this.bestTransport.route.legs[0].duration.humanReadable;
    if (this.transit) {
      const blank = ' ';
      this.resultArrivalTime = `${this.bestTransport.route.legs[0].arrivalTime.dayOfMonth}
        /${this.bestTransport.route.legs[0].arrivalTime.monthOfYear}
        /${this.bestTransport.route.legs[0].arrivalTime.year} ${blank}
        ${this.bestTransport.route.legs[0].arrivalTime.hourOfDay}
        :${this.bestTransport.route.legs[0].arrivalTime.minuteOfHour}`;
      this.resultDepartureTime = `${this.bestTransport.route.legs[0].departureTime.dayOfMonth}
        /${this.bestTransport.route.legs[0].departureTime.monthOfYear}
        /${this.bestTransport.route.legs[0].departureTime.year} ${blank}
        ${this.bestTransport.route.legs[0].departureTime.hourOfDay}
        :${this.bestTransport.route.legs[0].departureTime.minuteOfHour}`;
    }
    this.resultStartAddress = this.bestTransport.route.legs[0].startAddress;
    this.resultEndAddress = this.bestTransport.route.legs[0].endAddress;
    console.log(this.transit);
  }
}
