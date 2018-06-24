import { TestBed, inject } from '@angular/core/testing';

import { ClockDataService } from './clock-data.service';

describe('ClockDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClockDataService]
    });
  });

  it('should be created', inject([ClockDataService], (service: ClockDataService) => {
    expect(service).toBeTruthy();
  }));
});
