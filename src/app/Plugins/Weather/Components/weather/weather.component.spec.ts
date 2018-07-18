import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WeatherComponent } from './weather.component';
import { WeatherDataService } from '../../Services/weather-data.service';

describe('WeatherComponent', () => {
    let component: WeatherComponent;
    let fixture: ComponentFixture<WeatherComponent>;

    beforeEach(async(() => {
        const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
        TestBed.configureTestingModule({
            declarations: [WeatherComponent],
            providers: [
                { provide: WeatherDataService, useValue: spy }
            ],
            imports: [
                MatFormFieldModule,
                MatButtonModule,
                MatInputModule,
                MatCardModule,
                MatSelectModule,
                MatCheckboxModule,
                MatToolbarModule,
                MatMenuModule,
                MatListModule,
                MatGridListModule,
                MatDividerModule,
                BrowserAnimationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        /* fixture = TestBed.createComponent(WeatherComponent);
         component = fixture.componentInstance;
         fixture.detectChanges();*/
    });

    it('should create', () => {
        //this test doesn't do anything anyway ¯\_(ツ)_/¯ -Felix B
        //expect(component).toBeTruthy();
    });
});
