import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../Services/database.service';
import {TTSService} from '../../Services/tts.service';
import {SpeechRecognitionService} from '../../Services/speechrecognition.service';
import {command} from '../../Objects/command';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

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
export class HomeComponent implements OnInit {

    srState = 'inactive';
    commandTextValue = '';
    commandData: command;
    constructor(private readonly databaseService: DatabaseService, private readonly ttsService: TTSService, private readonly speechRecognitionService: SpeechRecognitionService) {}

    ngOnInit() {
        this.commandData = new command;
    }

    /*
      Sending typed command to the backend-service for general functions.
    */
    sendCommand(commandValue: string) {
        this.commandData.value = commandValue;
        this.databaseService.sendCommand(this.commandData);
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
        });
    }
}
