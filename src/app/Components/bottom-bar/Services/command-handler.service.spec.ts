import { TestBed, inject } from '@angular/core/testing';

import { CommandHandlerService } from './command-handler.service';
import { DatabaseService } from '../../../Services/database.service';

describe('CommandHandlerService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [CommandHandlerService,
        { provide: DatabaseService, useValue: spy }]
    });
  });

  it('should be created', inject([CommandHandlerService], (service: CommandHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
