import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryContainerComponent } from './registry-container.component';

describe('RegistryContainerComponent', () => {
  let component: RegistryContainerComponent;
  let fixture: ComponentFixture<RegistryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
