import { TestBed, inject } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
    let httpClientSpy: {get: jasmine.Spy};
  beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [WeatherDataService,
      {provide: HttpClient, useValue: httpClientSpy}]
    });
  });

  it('should be created', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service).toBeTruthy();
  }));
});
