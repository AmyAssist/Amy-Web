import {Component, NgZone, OnInit} from '@angular/core';
import {DatabaseService} from '../../Services/database.service';
import {TTSService} from '../../Services/tts.service';
import {SpeechRecognitionService} from '../../Services/speechrecognition.service';
import {Command} from '../../Objects/command';
import {AMY_UNKNOWN_COMMAND_RESPONSE, CHAT_DISPLAY_BUTTON_ACTIVE, CHAT_DISPLAY_BUTTON_INACTIVE, COMMAND_INPUT_PLACEHOLDER} from './strings';
import {Message} from './message';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ErrorStateMatcher} from '@angular/material/core';

export class CommandErrorStateMatcher implements ErrorStateMatcher {
  error = false;
  isErrorState(control, form) {
    return this.error;
  }
}

@Component({
  selector: 'app-amy-chat',
  templateUrl: './amy-chat.component.html',
  styleUrls: ['./amy-chat.component.css'],
  animations: [
    trigger('srState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cf0000',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AmyChatComponent implements OnInit {

  messages: Message[] = [];
  zone = new NgZone({enableLongStackTrace: false});
  language = 0;

  buttonName: string = CHAT_DISPLAY_BUTTON_INACTIVE[this.language];
  commandInputPlaceholder: string = COMMAND_INPUT_PLACEHOLDER[this.language];
  displayChat = false;

  srState = 'inactive';

  commandTextValue = '';
  response: string;

  errorStateMatcher = new CommandErrorStateMatcher();

  constructor(private readonly databaseService: DatabaseService, private readonly ttsService: TTSService,
    private readonly speechRecognitionService: SpeechRecognitionService) { }

  ngOnInit() {
  }

  /**
   * Add a Message to the Visible Chat
   * @param name Name of the Message Source
   * @param value String of the Message
   */
  private addMessage(name: string, value: string) {
    this.messages.push({ name, value });
  }

  /**
   * Send the Text which is currently in the command Text Box
   */
  sendTextFieldMessage() {
    this.addMessage('user', this.commandTextValue);
    this.sendCommand(this.commandTextValue, false);
    this.commandTextValue = '';
  }

  /**
   * Trigger the displayal of the chat window
   */
  changeDisplayState() {
    if (!this.displayChat) {
      this.displayChat = true;
      this.buttonName = CHAT_DISPLAY_BUTTON_ACTIVE[this.language];
    } else {
      this.displayChat = false;
      this.buttonName = CHAT_DISPLAY_BUTTON_INACTIVE[this.language];
    }
  }

  /**
   * Stop the current tts
   */
  stopOutput() {
    this.ttsService.stop();
  }

  /**
   * Sending typed command to the backend-service for general functions.
   * @param commandValue String consisting of the Command
   * @param readResponse Boolean that describes if the response shoudl be read out loud
   */
  private sendCommand(commandValue: string, readResponse: boolean) {
    const commandData = new Command(commandValue);
    this.databaseService.sendCommand(commandData).subscribe(r => {
      this.response = r;
      this.errorStateMatcher.error = false;
      this.responseMessage(this.response, readResponse);
    }, error => {
      this.response = null;
      this.errorStateMatcher.error = true;
      this.responseMessage(AMY_UNKNOWN_COMMAND_RESPONSE[this.language], readResponse);

    });
  }

  /**
   * Speak the command wiith the TTSService
   */
  private responseMessage(responseValue: string, readResponse: boolean) {
    this.zone.run(() => {
        this.addMessage('amy', responseValue);
    });
    if (readResponse) {
      this.ttsService.speak(responseValue);
    }
  }

  /**
   * Send the srResponse to Backend and Chat
   * @param name Name of the Message Source
   * @param command String of the Command
   * @param readResponse Boolean that describes if the Message should be read
   */
  private srResponse(name: string, command: string, readResponse: boolean) {
    if (this.srState === 'active') {
      this.addMessage(name, command);
      this.sendCommand(command, true);
    }
  }

  /**
   * Activate/Deactivate the SR
   */
  triggerSR() {
    if (this.srState !== 'active') {
      this.srState = 'active';
      this.speechRecognitionService.recognize((result) => {
        this.srResponse('user', result, true);
        this.srState = 'inactive';
      });
    } else {
      this.srState = 'inactive';
      this.speechRecognitionService.cancelRecognition();
    }
  }

  isSRSupported() {
    return this.speechRecognitionService.isSupported();
  }
}
