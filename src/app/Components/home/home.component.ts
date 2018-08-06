import { Component } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { TTSService } from '../../Services/tts.service';
import { SpeechRecognitionService } from '../../Services/speechrecognition.service';
import { Command } from '../../Objects/command';
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
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
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
export class HomeComponent {

    srState = 'inactive';
    commandTextValue = '';
    response: string;
    errorStateMatcher = new CommandErrorStateMatcher();

    constructor(private readonly databaseService: DatabaseService, private readonly ttsService: TTSService,
        private readonly speechRecognitionService: SpeechRecognitionService) { }


    /*
      Sending typed command to the backend-service for general functions.
    */
    sendCommand(commandValue: string, readResponse: boolean) {
        const commandData = new Command(commandValue);
        this.databaseService.sendCommand(commandData).subscribe(r => {
            this.response = r;
            this.errorStateMatcher.error = false;
            if (readResponse) {
                this.speakCommand(this.response);
            }
        }, error => {
            this.response = null;
            this.errorStateMatcher.error = true;
            if (readResponse) {
                this.speakCommand('I could not understand that');
            }
        });
    }

    /**
     * Speak the command wiith the TTSService
     */
    speakCommand(commandValue: string) {
        this.ttsService.speak(commandValue);
    }

    speechRecognition() {
        this.srState = 'active';
        this.speechRecognitionService.recognize((result) => {
            this.commandTextValue = result;
            this.srState = 'inactive';
            this.sendCommand(result, true);
        });
    }
}
