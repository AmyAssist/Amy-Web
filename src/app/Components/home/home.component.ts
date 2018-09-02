import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from '../../Services/speechrecognition.service';
import { TTSService } from '../../Services/tts.service';
import { USER_CHAT_NAME, COMMAND_INPUT_PLACEHOLDER } from '../../Constants/strings';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommandHandlerService } from './Services/command-handler.service';
import { ChatService } from './Components/amy-chat/Services/chat.service';
import { OptionsService } from '../../Services/options.service';
import { BackendResolver } from '../../Services/backendResolver.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('srState', [
            state('inactive', style({
                backgroundColor: '#283593',
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

    //PlaceHolder for Command input Field
    commandInputPlaceholder: string = COMMAND_INPUT_PLACEHOLDER[this.options.language];

    //Content of command input field
    commandTextValue = '';

    //State of the current Speech Recognition
    srState = 'inactive';

    //is the Sound muted in Backend
    backendSoundMuted = false;

    constructor(
        private readonly speechRecognitionService: SpeechRecognitionService,
        private readonly ttsService: TTSService,
        private readonly options: OptionsService,
        private readonly commandHandler: CommandHandlerService,
        private readonly chat: ChatService,
        private readonly backend: BackendResolver) { }


    ngOnInit() {
    }

    get soundEnabled() {
        return this.options.soundEnabled;
    }

    get srSupported() {
        return this.speechRecognitionService.isSupported();
    }



    sendTextFieldMessage() {
        if (this.commandTextValue.trim().length > 0) {
            this.chat.addMessage(false, USER_CHAT_NAME[this.options.language], this.commandTextValue, false);
            this.commandHandler.sendCommand(this.commandTextValue, false);
            this.commandTextValue = '';
        }
    }

    /**
     * Stop the current tts
     */
    triggerSound() {
        if (this.options.soundEnabled) {
            if (this.ttsService.currentlyOutputting) {
                this.ttsService.stop();
            } else {
                this.options.mute();
            }
        } else {
            this.options.unmute();
        }
    }

    /**
     * Mute/Unmute the sound output of the backend
     */
    triggerBackendSound() {
        if (this.backend.checkBackendSoundState()) {
            this.backend.mute().subscribe();
        } else {
            this.backend.unmute().subscribe();
        }
    }

    /**
     * Send the srResponse to Backend and Chat
     * @param command String of the Command
     */
    private srResponse(command: string) {
        if (this.srState === 'active') {
            this.chat.addMessage(false, USER_CHAT_NAME[this.options.language], command, false);
            this.commandHandler.sendCommand(command, true);
        }
    }

    /**
     * Activate/Deactivate the SR
     */
    triggerSR() {
        if (this.srState !== 'active') {
            this.srState = 'active';
            if (this.backend.checkBackendSoundState()) {
                this.backendSoundMuted = true;
                this.backend.mute().subscribe();
            }
            this.speechRecognitionService.recognize((result) => {
                this.srResponse(result);
                this.srState = 'inactive';
                if (this.backendSoundMuted) {
                    this.backendSoundMuted = false;
                    this.backend.unmute().subscribe();
                }
            });
        } else {
            this.srState = 'inactive';
            if (this.backendSoundMuted) {
                this.backendSoundMuted = false;
                this.backend.unmute().subscribe();
            }
            this.speechRecognitionService.cancelRecognition();
        }
    }
}
