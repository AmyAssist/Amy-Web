import { TestBed, inject } from '@angular/core/testing';

import { MusicDataTransferService } from './music-data-transfer.service';

describe('MusicDataTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicDataTransferService]
    });
  });

  it('should be created', inject([MusicDataTransferService], (service: MusicDataTransferService) => {
    expect(service).toBeTruthy();
  }));
});
