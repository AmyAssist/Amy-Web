import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBarComponent } from "./bottom-bar.component";
import { MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmyChatComponent } from './Components/amy-chat/amy-chat.component';
import { CommandHandlerService } from './Services/command-handler.service';
import { SpeechRecognitionService } from '../../Services/speechrecognition.service';
import { TTSService } from '../../Services/tts.service';
import { OptionsService } from '../../Services/options.service';
import { ChatService } from './Components/amy-chat/Services/chat.service';

describe('BottomBarComponent', () => {
  let component: BottomBarComponent;
  let fixture: ComponentFixture<BottomBarComponent>;

  beforeEach(async(() => {
    const sttSpy = jasmine.createSpyObj('SpeechRecognitionService', ['recognize', 'cancelRecognition', 'isSRSupported']);
    const ttsSpy = jasmine.createSpyObj('TTSService', ['stop']);
    const optionsSpy = jasmine.createSpyObj('OptionsService', ['getLanguage', 'shallDisplayChat', 'setDisplayChat']);
    const commandHandlerSpy = jasmine.createSpyObj('CommandHandlerService', ['sendCommand']);
    const chatSpy = jasmine.createSpyObj('ChatService', ['addMessage']);
    TestBed.configureTestingModule({
      declarations: [ BottomBarComponent, AmyChatComponent ],
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
        { provide: SpeechRecognitionService, useValue: sttSpy },
        { provide: TTSService, useValue: ttsSpy },
        { provide: OptionsService, useValue: optionsSpy },
        { provide: CommandHandlerService, useValue: commandHandlerSpy },
        { provide: ChatService, useValue: chatSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
