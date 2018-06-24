import { TestBed, inject } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherDataService]
    });
  });

  it('should be created', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service).toBeTruthy();
  }));
});
