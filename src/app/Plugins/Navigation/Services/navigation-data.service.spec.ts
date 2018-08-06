import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NavigationDataService } from './navigation-data.service';

describe('NavigationDataService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let navigationService: NavigationDataService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        NavigationDataService,
        { provide: HttpClient, useValue: httpClientSpy }]
    });
    //navigationService = TestBed.get(NavigationDataService);
  });

  it('should be created', () => {
    //expect(navigationService).toBeTruthy();
  });
});
