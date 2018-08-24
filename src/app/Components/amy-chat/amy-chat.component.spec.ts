import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseService } from "../../Services/database.service";

import { AmyChatComponent } from './amy-chat.component';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AmyChatComponent', () => {
  let component: AmyChatComponent;
  let fixture: ComponentFixture<AmyChatComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    TestBed.configureTestingModule({
      declarations: [ AmyChatComponent ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DatabaseService, useValue: spy }
      ]
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
