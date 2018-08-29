import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { BackendResolver } from './backendResolver.service';


describe('DatabaseService', () => {
    let databaseService: DatabaseService;
    beforeEach(() => {
        const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
        const backendResolverSpy = jasmine.createSpyObj('BackendResolver', ['backendPath']);
        TestBed.configureTestingModule({
            providers: [
                DatabaseService,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: BackendResolver, useValue: backendResolverSpy }]
        });
        databaseService = TestBed.get(DatabaseService);
    });

    it('should be created', () => {
        expect(databaseService).toBeTruthy();
    });
});
