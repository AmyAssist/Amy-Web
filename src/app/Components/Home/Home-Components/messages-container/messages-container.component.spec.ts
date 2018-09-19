import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesContainerComponent } from './messages-container.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OptionsService } from '../../../../Services/options.service';
import { CommandHandlerService } from '../../Home-Services/command-handler.service';
import { ChatService } from '../../Home-Services/chat.service';
import {WeatherModule} from '../../../../Plugins/Weather/weather.module';
import {NavigationModule} from '../../../../Plugins/Navigation/navigation.module';

describe('MessagesContainerComponent', () => {
  let component: MessagesContainerComponent;
  let fixture: ComponentFixture<MessagesContainerComponent>;

  beforeEach(async(() => {
    const optionsSpy = jasmine.createSpyObj('OptionsService', ['getLanguage']);
    const commandHandlerSpy = jasmine.createSpyObj('CommandHandlerService', ['sendCommand']);
    const chatSpy = jasmine.createSpyObj('ChatService', ['getMessages', 'addMessage']);
    TestBed.configureTestingModule({
      declarations: [MessagesContainerComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        WeatherModule,
        NavigationModule
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
    fixture = TestBed.createComponent(MessagesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
