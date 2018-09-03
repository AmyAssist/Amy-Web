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

    getTagDisplayName(t: Tag) {
        return t ? t.name : '';
    }

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

        this.loadTags();
    }

    loadTags() {
        this.tags = this.navigationService.getTags().pipe(map(tags => tags.map(t => new Tag(t))));

        this.originFilteredTags = combineLatest(
            this.originField.valueChanges.pipe(startWith('')) as Observable<string | Tag>,
            this.tags.pipe(startWith([]))
        ).pipe(
            map(([text, tags]) => tags.filter(tag => {
                let searchText: string;
                if (text instanceof Tag) {
                    searchText = text.name;
                } else {
                    searchText = text;
                }
                return tag.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
            })
        ));

        this.destinationFilteredTags = combineLatest(
            this.destinationField.valueChanges.pipe(startWith('')) as Observable<string | Tag>,
            this.tags.pipe(startWith([]))
        ).pipe(
            map(([text, tags]) => tags.filter(tag => {
                let searchText: string;
                if (text instanceof Tag) {
                    searchText = text.name;
                } else {
                    searchText = text;
                }
                return tag.name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
            })
        ));
    }

    async fromToWay(from: string | Tag, to: string | Tag, date: string) {
        this.createRoute(from, to, date);
        this.navPathData.travelmode = this.travelMode1;
        this.navigationService.fromTo(this.navPathData).subscribe((data: BestTransportResult) => {
            this.bestTransport = { ...data };
            this.calcResult();
            this.showWay = true;
            this.showWhen = false;
            this.showMode = false;
        });
    }

    async bestType(from: string, to: string, date: string) {
        this.createRoute(from, to, date);
        this.navigationService.best(this.navPathData).subscribe((data: BestTransportResult) => {
            this.bestTransport = { ...data };
            this.calcResult();
            this.showWay = false;
            this.showWhen = false;
            this.showMode = true;
        });
    }

    async searchWhen(from: string | Tag, to: string | Tag, date: string) {
        this.createRoute(from, to, date);
        this.navPathData.travelmode = this.travelMode2;
        this.navigationService.when(this.navPathData).subscribe((data: string) => {
            this.whenTime = data;
            this.whenTimeDate = new Date(this.whenTime);
            this.showWay = false;
            this.showWhen = true;
            this.showMode = false;
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
