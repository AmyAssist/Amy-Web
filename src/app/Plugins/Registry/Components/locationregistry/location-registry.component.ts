import { Component, OnInit } from '@angular/core';
import {LocationRegistryDataService} from '../../Services/location-registry-data.service';
import {Location} from '../../Objects/location';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

/**
 * @author Benno Krauß
 */
@Component({
    selector: 'app-locationregistry',
    templateUrl: './location-registry.component.html',
    styleUrls: ['./location-registry.component.css']
})
export class LocationRegistryComponent implements OnInit {

    locations: Location[];

    displayedColumns = ['name', 'address', 'home', 'work'];

    constructor(private readonly registryService: LocationRegistryDataService) {
    }

    ngOnInit() {
        this.refreshLocations();
    }

    refreshLocations(): void {
        this.registryService.getAll().subscribe((value: Location[]) => {
            const result: Location[] = [];
            for (const loc of value) {
                result.push(Object.assign(new Location(), loc));
            }
            console.log('got locations', result);
            this.locations = result;
        });
    }

    toggleHome(row: Location) {
        if (!this.locations.includes(row)) {
            console.error('Array of locations doesn\'t contain the toggled row');
            return;
        }
        row.home = !row.home;

        this.registryService.post(row).subscribe(a => {
            console.log('Result: ', a);
            this.refreshLocations();
        });
    }

    toggleWork(row) {
        console.log('toggleWork', row);
    }
}
