import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from './database.service';


describe('DatabaseService', () => {
    let httpClientSpy: {get: jasmine.Spy};
    let databaseService: DatabaseService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [
                DatabaseService,
                {provide: HttpClient, useValue: httpClientSpy}]
        });
        databaseService = TestBed.get(DatabaseService);
    });

    it('should be created', () => {
        expect(databaseService).toBeTruthy();
    });
});
