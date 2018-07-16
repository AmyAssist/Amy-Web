import { TestBed } from '@angular/core/testing';

import { ClockComponent } from './clock.component';

import { ClockDataService } from '../../Services/clock-data.service';

describe('ClockComponent', () => {
    let component: ClockComponent;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
        TestBed.configureTestingModule({
            providers: [
                ClockComponent,
                { provide: ClockDataService, useValue: spy }
            ]
        });
        component = TestBed.get(ClockComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
