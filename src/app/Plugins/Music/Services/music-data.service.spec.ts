import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MusicDataService } from './music-data.service';

describe('MusicDataService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [MusicDataService,
        {
          provide: HttpClient
          , useValue: httpClientSpy
        }]
    });
  });

  it('should be created', inject([MusicDataService], (service: MusicDataService) => {
    expect(service).toBeTruthy();
  }));
});
