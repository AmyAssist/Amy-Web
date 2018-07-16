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

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MusicComponent } from './music.component';

import { MusicDataService } from '../../Services/music-data.service';
/*
describe('MusicComponent', () => {
    let component: MusicComponent;
    let fixture: ComponentFixture<MusicComponent>;

    beforeEach(async(() => {
        const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
        TestBed.configureTestingModule({
            declarations: [MusicComponent],
            
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
                BrowserAnimationsModule],
                providers: [
                    {provide: MusicDataService
                        , useValue: spy
                    }
                ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MusicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
*/