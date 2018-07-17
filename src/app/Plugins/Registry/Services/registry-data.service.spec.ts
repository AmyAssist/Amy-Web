import { TestBed, inject } from '@angular/core/testing';

import { LocationRegistryDataService } from './location-registry-data.service';

describe('LocationRegistryDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocationRegistryDataService]
        });
    });

    it('should be created', inject([LocationRegistryDataService], (service: LocationRegistryDataService) => {
        expect(service).toBeTruthy();
    }));
});
