import { TestBed, inject } from '@angular/core/testing';

import { NavigationDataService } from './navigation-data.service';

describe('NavigationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationDataService]
    });
  });

  it('should be created', inject([NavigationDataService], (service: NavigationDataService) => {
    expect(service).toBeTruthy();
  }));
});
