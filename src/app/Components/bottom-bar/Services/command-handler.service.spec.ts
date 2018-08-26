import { TestBed, inject } from '@angular/core/testing';

import { CommandHandlerService } from './command-handler.service';
import { DatabaseService } from '../../../Services/database.service';
import { HttpClient } from '@angular/common/http';

describe('CommandHandlerService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [CommandHandlerService,
        { provide: DatabaseService, useValue: spy },
        { provide: HttpClient, useValue: httpClientSpy }]
    });
  });

  it('should be created', inject([CommandHandlerService], (service: CommandHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
