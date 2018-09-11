import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { NavPath } from '../../Objects/navPath';
import { BestTransportResult } from '../../Objects/bestTransportResult';
import { combineLatest, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Coordinate } from '../../Objects/Coordinate';

class Tag {
  constructor(readonly name: string) { }
}

@Component({
  selector: 'app-travel-mode',
  templateUrl: './travel-mode.component.html',
  styleUrls: ['./travel-mode.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TravelModeComponent implements OnInit {

  navPathData: NavPath;
  from: string;
  to: string;
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
  resultMode: string;
  resultDistance: string;
  resultDuration: string;
  resultArrivalTime: string;
  resultDepartureTime: string;
  resultStartAddress: string;
  resultEndAddress: string;


  tags: Observable<Tag[]>;
  originFilteredTags: Observable<Tag[]>;
  destinationFilteredTags: Observable<Tag[]>;

  originField = new FormControl();
  destinationField = new FormControl();

  link: string = null;

  createLink(from: Coordinate, to: Coordinate, mode: string) {
    this.link = `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=${mode}`;
  }

  getTagDisplayName(t: Tag) {
    return t ? t.name : '';
  }

  constructor(private readonly navigationService: NavigationDataService) { }

  ngOnInit() {
    this.showWay = false;
    this.showWhen = false;
    this.showMode = false;
    this.transit = false;
    this.navPathData = new NavPath();
    this.bestTransport = new BestTransportResult();

    this.loadTags();
  }

  loadTags() {
    this.tags = this.navigationService.getTags().pipe(map(tags => tags.map(t => new Tag(t))));

    const mapping = map(([text, tags]) => tags.filter(tag => {
      let searchText: string;
      if (text instanceof Tag) {
        searchText = text.name;
      } else {
        searchText = text;
      }
      return tag.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
    }));

    this.originFilteredTags = combineLatest(
      this.originField.valueChanges.pipe(startWith('')) as Observable<string | Tag>,
      this.tags.pipe(startWith([]))
    ).pipe(mapping);

    this.destinationFilteredTags = combineLatest(
      this.destinationField.valueChanges.pipe(startWith('')) as Observable<string | Tag>,
      this.tags.pipe(startWith([]))
    ).pipe(mapping);
  }

  async bestType(from: string, to: string, date: string) {
    this.createRoute(from, to, date);
    this.navigationService.best(this.navPathData).subscribe((data: BestTransportResult) => {
      this.bestTransport = { ...data };
      this.calcResult();
      this.showWay = false;
      this.showWhen = false;
      this.showMode = true;
      this.createLink(this.bestTransport.route.legs[0].startLocation,
        this.bestTransport.route.legs[0].endLocation, this.bestTransport.mode);
    });
  }

  createRoute(from: string | Tag, to: string | Tag, date: string) {
    if (from instanceof Tag) {
      this.navPathData.originTag = from.name;
    } else {
      this.navPathData.origin = from;
    }
    if (to instanceof Tag) {
      this.navPathData.destinationTag = to.name;
    } else {
      this.navPathData.destination = to;
    }
    this.timeDate = new Date(date);
    this.navPathData.time = this.timeDate.toISOString();
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