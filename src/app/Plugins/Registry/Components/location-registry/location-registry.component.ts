import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationRegistryDataService } from '../../Services/location-registry-data.service';
import { Location } from '../../Objects/location';
import { LocationValidatorService } from './location-validator.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../../../Components/error-dialog/error-dialog.component';
import { AsyncTableDataSource } from '../../AsyncTableDataSource';

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

    dataSource: AsyncTableDataSource<Location>;
    @Output() locationListChange = new EventEmitter<Location[]>();

    displayedColumns = ['name', 'street', 'houseNumber', 'zipCode', 'city', 'tag', 'actionsColumn'];



    constructor(private readonly registryService: LocationRegistryDataService, private readonly locationValidator: LocationValidatorService,
        private readonly dialog: MatDialog) {
    }

    ngOnInit() {
        this.dataSource = new AsyncTableDataSource<Location>([], Location, this.locationValidator,
            this.insertLocation.bind(this),
            this.updateLocation.bind(this),
            this.deleteLocation.bind(this));
        this.dataSource.datasourceSubject.subscribe(list => {
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
                result.push(l);
            }
            console.log('got locations', result);
            this.dataSource.updateDatasource(result, { emitEvent: true });
        });
    }

    async insertLocation(l: Location): Promise<boolean> {
        const newLocation = this.copyLocationObject(l);

        try {
            await this.createUpdateLocation(newLocation);
        } catch (error) {
            this.showError(error.toString());
            // Don't insert the new row
            return false;
        }
        // Dspatch reload
        this.refreshLocations();

        return true;
    }

    async updateLocation(l: Location): Promise<boolean> {
        const newLocation = this.copyLocationObject(l);

        try {
            await this.createUpdateLocation(newLocation);
        } catch (error) {
            this.showError(error.toString());
            // Don't insert the new row
            return false;
        }
        return true;
    }

    async deleteLocation(l: Location): Promise<boolean> {
        try {
            await this.registryService.deleteById(l.persistentId).toPromise();
            return true;
        } catch (error) {
            this.showError(error.toString());
            // Don't delete the row
            return false;
        }
    }

    copyLocationObject(l: Location): Location {
        return Object.assign(new Location(), l);
    }

    async createUpdateLocation(l: Location) {
        return this.registryService.post(l).toPromise();
    }

    showError(message: string) {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message },
            width: '500px'
        });
    }
}
