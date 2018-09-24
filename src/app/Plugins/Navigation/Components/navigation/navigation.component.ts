import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationDataService } from '../../Services/navigation-data.service';
import { NavPath } from '../../Objects/navPath';
import { BestTransportResult } from '../../Objects/bestTransportResult';
import { combineLatest, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

/*
  Component for the Navigation-Plugin
  The functionalities are splitted in multiple components that unite in this one

  @author: Tobias Siemonsen
*/
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent implements OnInit {
    constructor(private readonly navigationService: NavigationDataService) { }

    ngOnInit() { }
}
