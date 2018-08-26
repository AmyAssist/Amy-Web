import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmyChatComponent } from './amy-chat.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommandHandlerService } from '../../Services/command-handler.service';

describe('AmyChatComponent', () => {
  let component: AmyChatComponent;
  let fixture: ComponentFixture<AmyChatComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CommandHandlerService', ['getValue']);
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
        { provide: CommandHandlerService, useValue: spy }
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
