import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { NavPath } from '../../Objects/navPath';
import { BestTransportResult } from '../../Objects/bestTransportResult';
import { combineLatest, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

class Tag {
    constructor(readonly name: string) { }
}

/*
  Component for the departure-planner functionality of the Navigation-Plugin
  it is Part of the navigation component

  @author: Tobias Siemonsen
*/
@Component({
    selector: 'app-departure-planner',
    templateUrl: './departure-planner.component.html',
    styleUrls: ['./departure-planner.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class DeparturePlannerComponent implements OnInit {

    navPathData: NavPath;
    from: string;
    to: string;
    timeDate: Date;
    travelMode: string;
    showWhen: boolean;
    whenTime: string;
    whenTimeDate: Date;
    bestTransport: BestTransportResult;

    transit: boolean;

    tags: Observable<Tag[]>;
    originFilteredTags: Observable<Tag[]>;
    destinationFilteredTags: Observable<Tag[]>;

    originField = new FormControl();
    destinationField = new FormControl();

    getTagDisplayName(t: Tag) {
        return t ? t.name : '';
    }

    constructor(private readonly navigationService: NavigationDataService) { }

    ngOnInit() {
        this.showWhen = false;
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
        This Method executes the main functionality, it calls the createRoute Method
        and send the object with the backend service to the backend,
        then it uses the recieved time object to display it.
    */
    async searchWhen(from: string | Tag, to: string | Tag, date: string) {
        this.createRoute(from, to, date);
        this.navPathData.travelmode = this.travelMode;
        this.navigationService.when(this.navPathData).subscribe((data: string) => {
            this.whenTime = data;
            this.whenTimeDate = new Date(this.whenTime);
            this.showWhen = true;
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
