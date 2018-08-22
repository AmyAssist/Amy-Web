import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmyChatComponent } from './amy-chat.component';

describe('AmyChatComponent', () => {
  let component: AmyChatComponent;
  let fixture: ComponentFixture<AmyChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmyChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
