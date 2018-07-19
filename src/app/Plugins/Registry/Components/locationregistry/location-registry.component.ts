import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationRegistryDataService} from '../../Services/location-registry-data.service';
import {Location} from '../../Objects/location';
import {TableDataSource, TableElement, ValidatorService} from 'angular4-material-table';
import {LocationValidatorService} from './location-validator.service';

/**
 * @author Benno Krauß
 */
@Component({
    selector: 'app-locationregistry',
    templateUrl: './location-registry.component.html',
    styleUrls: ['./location-registry.component.css'],
    providers: [
        LocationValidatorService
    ]
})
export class LocationRegistryComponent implements OnInit {

    dataSource: TableDataSource<Location>;
    @Output() locationListChange = new EventEmitter<Location[]>();

    displayedColumns = ['name', 'street', 'houseNumber', 'zipCode', 'city', 'tag', 'actionsColumn'];



    constructor(private readonly registryService: LocationRegistryDataService, private locationValidator: LocationValidatorService) {
    }

    ngOnInit() {
        this.dataSource = new TableDataSource<Location>([], Location, this.locationValidator);
        this.dataSource.datasourceSubject.subscribe(list => {
            console.log('Something changed: ', list);
            this.locationListChange.emit(list);
        });

        this.refreshLocations();
    }

    refreshLocations() {
        this.registryService.getAll().subscribe((value: Location[]) => {
            // Convert objects to proper LocationObjects
            const result: Location[] = [];
            for (const loc of value) {
                const l: Location = this.copyLocationObject(loc);
                this.convertToTag(l);
                result.push(l);
            }
            console.log('got locations', result);
            this.dataSource.updateDatasource(result, { emitEvent: true });
        });
    }

    editCreateRow(row: TableElement<Location>) {
        if (row.id === -1) {
            if (this.dataSource.confirmCreate(row)) {
                console.log('Row created');
                const newLocation = this.copyLocationObject(row.currentData);
                this.convertToAttributes(newLocation);
                this.createLocation(newLocation);
            }
        } else {
            if (this.dataSource.confirmEdit(row)) {
                console.log('Row updated');
                const updatedLocation = this.copyLocationObject(row.currentData);
                this.convertToAttributes(updatedLocation);
                this.updateLocation(updatedLocation);
            }
        }
    }

    cancelOrDelete(row: TableElement<Location>) {
        if (row.id !== -1 && !row.editing) {
            // Row was not new, we need to delete it from the server
            this.registryService.deleteById(row.currentData.persistentId).subscribe(() => {
                console.log('Delete entity from server');
            });
        }
        row.cancelOrDelete();
    }

    copyLocationObject(l: Location): Location {
        return Object.assign(new Location(), l);
    }

    createLocation(l: Location) {
        this.registryService.post(l).subscribe((newLocation: Location) => {
            console.log('Sent new location to server');
            // Refresh locations to get new primary key
            this.refreshLocations();
        });
    }

    updateLocation(l: Location) {
        this.registryService.post(l).subscribe((newLocation: Location) => {
            console.log('Sent update to server');
        });
    }

    /**
     * Translate the two boolean attributes `home` and `work` to the appropriate `tag` attribute
     * @param {Location} l
     */
    convertToTag(l: Location) {
        let tag;
        if (l.home) {
            tag = 'home';
        } else if (l.work) {
            tag = 'work';
        } else {
            tag = 'none';
        }
        l.tag = tag;
    }

    /**
     * Translate the `tag` attribute to the two boolean attributes `home` and `work` appropriately
     * @param {Location} l
     */
    convertToAttributes(l: Location) {
        let work = false;
        let home = false;
        switch (l.tag) {
            case 'none':
                break;
            case 'work':
                work = true;
                break;
            case 'home':
                home = true;
                break;
        }
        l.home = home;
        l.work = work;

        delete l.tag;
    }
}
