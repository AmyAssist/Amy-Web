import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToscaRegistryComponent } from './tosca-registry.component';

describe('ToscaRegistryComponent', () => {
  let component: ToscaRegistryComponent;
  let fixture: ComponentFixture<ToscaRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToscaRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToscaRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
