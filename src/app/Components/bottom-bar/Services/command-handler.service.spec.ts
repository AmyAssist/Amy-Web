import { TestBed, inject } from '@angular/core/testing';

import { CommandHandlerService } from './command-handler.service';
import { DatabaseService } from '../../../Services/database.service';
import { ChatService } from '../Components/amy-chat/Services/chat.service';
import { OptionsService } from '../../../Services/options.service';
import { Observable } from 'rxjs';

describe('CommandHandlerService', () => {
  beforeEach(() => {
    const databaseSpy = jasmine.createSpyObj('DatabaseService', ['registerChat', 'checkForResponses', 'sendCommand']);
    const observableSpy = jasmine.createSpyObj('Observable', ['subscribe']);
    const chatSpy = jasmine.createSpyObj('ChatService', ['addMessage']);
    const optionsSpy = jasmine.createSpyObj('OptionsService', ['getLanguage']);
    TestBed.configureTestingModule({
      providers: [CommandHandlerService,
        { provide: DatabaseService, useValue: databaseSpy },
        { provide: Observable, useValue: observableSpy },
        { provide: ChatService, useValue: chatSpy },
        { provide: OptionsService, useValue: optionsSpy }]
    });
  });

  it('should be created', inject([CommandHandlerService], (service: CommandHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
