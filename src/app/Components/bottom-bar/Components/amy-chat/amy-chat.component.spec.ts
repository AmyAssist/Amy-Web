import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmyChatComponent } from './amy-chat.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../../../Services/database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AmyChatComponent', () => {
  let component: AmyChatComponent;
  let fixture: ComponentFixture<AmyChatComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getValue']);
    TestBed.configureTestingModule({
      declarations: [AmyChatComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
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
