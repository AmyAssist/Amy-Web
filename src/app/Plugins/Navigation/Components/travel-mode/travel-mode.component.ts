import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { CalcService } from '../../Services/calc.service';
import { NavPath } from '../../Objects/navPath';
import { BestTransportResult } from '../../Objects/bestTransportResult';
import { combineLatest, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Coordinate } from '../../Objects/Coordinate';
import { ResultRoute } from '../../Objects/resultRoute';

class Tag {
  constructor(readonly name: string) { }
}

/*
  Component for the best travel mode functionality of the Navigation-Plugin
  it is Part of the navigation component

  @author: Tobias Siemonsen
*/
@Component({
  selector: 'app-travel-mode',
  templateUrl: './travel-mode.component.html',
  styleUrls: ['./travel-mode.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TravelModeComponent implements OnInit {

  result: ResultRoute;
  navPathData: NavPath;
  timeDate: Date;
  showMode: boolean;
  bestTransport: BestTransportResult;

  transit: boolean;

  tags: Observable<Tag[]>;
  originFilteredTags: Observable<Tag[]>;
  destinationFilteredTags: Observable<Tag[]>;

  originField = new FormControl();
  destinationField = new FormControl();

  link: string = null;

  /*
    This method creates a Google Maps link for the calculated route.
  */
  createLink(from: Coordinate, to: Coordinate, mode: string) {
    this.link = `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=${mode}`;
  }

  getTagDisplayName(t: Tag) {
    return t ? t.name : '';
  }

  constructor(private readonly navigationService: NavigationDataService, private calcService: CalcService) { }

  ngOnInit() {
    this.showMode = false;
    this.transit = false;
    this.navPathData = new NavPath();
    this.bestTransport = new BestTransportResult();

    this.loadTags();
  }

  /*
    This method loads the tags from the backend so they can be displayed in the UI
    and work as an entry string
  */
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

  /*
    This method implements the main functionality, it creates a navPath object and sends it to the Navigation Backend.
    The recieved Object is send to the calc-Service to create a result Object with strings that get displayed in the UI.
  */
  async bestType(from: string, to: string, date: string) {
    this.createRoute(from, to, date);
    this.navigationService.best(this.navPathData).subscribe((data: BestTransportResult) => {
      this.bestTransport = { ...data };
      this.result = this.calcService.calcResult(this.bestTransport, this.transit);
      this.showMode = true;
      this.createLink(this.bestTransport.route.legs[0].startLocation,
        this.bestTransport.route.legs[0].endLocation, this.bestTransport.mode);
    });
  }

  /*
    This Method creates an navPath object which is send to the navigation backend to calculate the best travel mode
  */
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
}
