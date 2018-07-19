import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRegistryComponent } from './location-registry.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';

describe('LocationRegistryComponent', () => {
  let component: LocationRegistryComponent;
  let fixture: ComponentFixture<LocationRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationRegistryComponent ],
      providers: [HttpClientModule],
      imports: [
          BrowserModule,
          MatFormFieldModule,
          MatButtonModule,
          MatInputModule,
          MatCardModule,
          MatExpansionModule,
          MatIconModule,
          MatTabsModule,
          MatSliderModule,
          FormsModule,
          BrowserAnimationsModule,
          FormsModule,
          MatSelectModule,
          MatCheckboxModule,
          MatToolbarModule,
          MatMenuModule,
          MatListModule,
          MatGridListModule,
          MatDividerModule,
          MatIconModule,
          MatTableModule,
          ReactiveFormsModule,
          HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
