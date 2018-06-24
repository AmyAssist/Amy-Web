import { TestBed, inject } from '@angular/core/testing';

import { MusicDataService } from './music-data.service';

describe('MusicDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicDataService]
    });
  });

  it('should be created', inject([MusicDataService], (service: MusicDataService) => {
    expect(service).toBeTruthy();
  }));
});
