import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmyChatComponent } from './amy-chat.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommandHandlerService } from '../../Services/command-handler.service';
import { OptionsService } from '../../../../Services/options.service';
import { ChatService } from './Services/chat.service';

describe('AmyChatComponent', () => {
  let component: AmyChatComponent;
  let fixture: ComponentFixture<AmyChatComponent>;

  beforeEach(async(() => {
    const optionsSpy = jasmine.createSpyObj('OptionsService', ['getLanguage']);
    const commandHandlerSpy = jasmine.createSpyObj('CommandHandlerService', ['sendCommand']);
    const chatSpy = jasmine.createSpyObj('ChatService', ['getMessages', 'addMessage']);
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
        { provide: OptionsService, useValue: optionsSpy },
        { provide: CommandHandlerService, useValue: commandHandlerSpy },
        { provide: ChatService, useValue: chatSpy }
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
