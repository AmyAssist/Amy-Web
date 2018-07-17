import { Component, OnInit } from '@angular/core';
import {LocationRegistryDataService} from '../../Services/location-registry-data.service';
import {Location} from '../../Objects/location';

@Component({
    selector: 'app-locationregistry',
    templateUrl: './location-registry.component.html',
    styleUrls: ['./location-registry.component.css']
})
export class LocationRegistryComponent implements OnInit {constructor(private readonly registryService: LocationRegistryDataService) { }

    ngOnInit() {
        this.testStuff();
    }

    testStuff(): void {

        this.registryService.getAll().subscribe((value: Location[]) => console.log('Got locations: ', value));
    }

}
