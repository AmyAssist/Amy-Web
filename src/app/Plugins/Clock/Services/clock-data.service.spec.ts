import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClockDataService } from './clock-data.service';

describe('ClockDataService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [ClockDataService,
        { provide: HttpClient, useValue: httpClientSpy }]
    });
  });

  it('should be created', inject([ClockDataService], (service: ClockDataService) => {
    expect(service).toBeTruthy();
  }));
});
