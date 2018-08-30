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

import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';

import { NavigationDataService } from '../../Services/navigation-data.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { TravelModeComponent } from './travel-mode.component';

describe('TravelModeComponent', () => {
  let component: TravelModeComponent;
  let fixture: ComponentFixture<TravelModeComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    TestBed.configureTestingModule({
      declarations: [TravelModeComponent],
      providers: [
        { provide: NavigationDataService, useValue: spy }
      ],
      imports: [
        MatExpansionModule,
        MatIconModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatSliderModule,
        FormsModule,
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
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MaterialModule
      ]
    }).compileComponents();
  }));

});
