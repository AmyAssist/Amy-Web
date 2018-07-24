import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EmailDataService } from './email-data.service';

describe('EmailDataService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [EmailDataService,
        {
          provide: HttpClient
          , useValue: httpClientSpy
        }]
    });
  });

  it('should be created', inject([EmailDataService], (service: EmailDataService) => {
    expect(service).toBeTruthy();
  }));
});
