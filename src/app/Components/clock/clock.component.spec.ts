import {TestBed} from '@angular/core/testing';

import {ClockComponent} from './clock.component';

import { DatabaseService } from '../../Services/database.service';

describe('ClockComponent', () => {
    let component: ClockComponent;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
        TestBed.configureTestingModule({
            providers: [
                ClockComponent,
                { provide: DatabaseService, useValue: spy }
            ]
        });
        component = TestBed.get(ClockComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
