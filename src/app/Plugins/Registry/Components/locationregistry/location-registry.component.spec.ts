import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRegistryComponent } from './location-registry.component';

describe('LocationRegistryComponent', () => {
  let component: LocationRegistryComponent;
  let fixture: ComponentFixture<LocationRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationRegistryComponent ]
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
