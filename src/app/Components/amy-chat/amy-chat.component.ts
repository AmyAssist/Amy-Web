import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { TTSService } from '../../Services/tts.service';
import { SpeechRecognitionService } from '../../Services/speechrecognition.service';
import { Command } from '../../Objects/command';
import { CHAT_DISPLAY_BUTTON_ACTIVE, CHAT_DISPLAY_BUTTON_INACTIVE } from "./strings";
import { Message } from "./message";
import { interval } from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ErrorStateMatcher } from '@angular/material/core';

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

  language = 0;

  buttonName: string = CHAT_DISPLAY_BUTTON_INACTIVE[this.language];
  displayChat: boolean = false;

  srState = 'inactive';

  commandTextValue = '';
  response: string;

  ignoreSRcount = 0;

  errorStateMatcher = new CommandErrorStateMatcher();

  constructor(private readonly databaseService: DatabaseService, private readonly ttsService: TTSService,
    private readonly speechRecognitionService: SpeechRecognitionService) { }

  ngOnInit() {
    this.databaseService.registerChat().subscribe(r => {
      if(r){
        this.startCheckingForResponses();
      }
    });
  }

  startCheckingForResponses(){
    interval(100).pipe(mergeMap(() => this.databaseService.checkForResponses())).subscribe(data => {
      if(data){
        this.responseMessage(data, false);
      }
  });
  }

  private addMessage(name: string, value: string) {
    this.messages.push({ name: name, value: value });
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
    if (this.displayChat == false) {
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
      //this.response = r;
      this.errorStateMatcher.error = false;
      //this.responseMessage(this.response, readResponse);
    }, error => {
      this.response = null;
      this.errorStateMatcher.error = true;
      this.responseMessage('I could not understand that', readResponse);

    });
  }

  /**
   * Speak the command wiith the TTSService
   */
  private responseMessage(responseValue: string, readResponse: boolean) {
    this.addMessage('amy', responseValue);
    if (readResponse) {
      this.ttsService.speak(responseValue);
    }
  }

  private srResponse(name: string, command: string, readResponse: boolean) {
    if (this.ignoreSRcount > 0) {
      this.ignoreSRcount--;
    } else {
      this.addMessage(name, command);
      this.sendCommand(command, true);
    }
  }

  triggerSR() {
    if (this.srState != 'active') {
      this.srState = 'active';
      this.speechRecognitionService.recognize((result) => {
        this.srState = 'inactive';
        this.srResponse('user', result, true);
      });
    } else {
      this.ignoreSRcount++;
      this.speechRecognitionService.cancelRecognition();
      this.srState = 'inactive';
    }
  }
}
