import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { TTSService } from '../../../../../Services/tts.service';

describe('ChatService', () => {
  const ttsSpy = jasmine.createSpyObj('TTSService', ['speak']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService,
        { provide: TTSService, useValue: ttsSpy }]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
