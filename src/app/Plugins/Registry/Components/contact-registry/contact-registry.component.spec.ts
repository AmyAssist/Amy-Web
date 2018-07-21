import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRegistryComponent } from './contact-registry.component';

describe('ContactRegistryComponent', () => {
  let component: ContactRegistryComponent;
  let fixture: ComponentFixture<ContactRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRegistryComponent ]
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
