import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRegistryComponent } from './contact-registry.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule, MatDividerModule,
    MatGridListModule,
    MatListModule, MatMenuModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

describe('ContactRegistryComponent', () => {
  let component: ContactRegistryComponent;
  let fixture: ComponentFixture<ContactRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRegistryComponent ],
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
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
