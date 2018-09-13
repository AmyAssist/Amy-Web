import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { COMMAND_INPUT_PLACEHOLDER, USER_CHAT_NAME } from '../../../../Constants/strings';
import { SpeechRecognitionService } from '../../../../Services/speechrecognition.service';
import { TTSService } from '../../../../Services/tts.service';
import { OptionsService } from '../../../../Services/options.service';
import { CommandHandlerService } from '../../Home-Services/command-handler.service';
import { ChatService } from '../../Home-Services/chat.service';
import { BackendSoundService } from '../../Home-Services/backendSound.service';
import { BackendResolver } from '../../../../Services/backendResolver.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('srState', [
            state('inactive', style({
                backgroundColor: '#3F51B5',
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

    @ViewChild('inputField') inputField: ElementRef;

    @ViewChild('scrollView') private scrollView: ElementRef;

    // PlaceHolder for Command input Field
    private readonly commandInputPlaceholder: string = COMMAND_INPUT_PLACEHOLDER[this.options.language];

    // Content of command input field
    private commandTextValue = '';

    // State of the current Speech Recognition
    private srState = 'inactive';

    // is the Sound muted in Backend
    private backendSoundMuted = false;

    // is the input field active
    private _keyboardActive = false;

    constructor(
        private readonly speechRecognitionService: SpeechRecognitionService,
        private readonly ttsService: TTSService,
        private readonly options: OptionsService,
        private readonly commandHandler: CommandHandlerService,
        private readonly chat: ChatService,
        private readonly backendSound: BackendSoundService,
        private readonly backend: BackendResolver) {
    }


    ngOnInit() {
        this.chat.stream.subscribe(() => {
            // Scroll the scrollView to the bottom when a new messages is received
            // Unfortunately the browser only inserts the HTML element slight later.
            // Therefore we have to do this awful hack and wait for a few milliseconds until the element is inserted
            setTimeout(() => {
                const table = this.scrollView.nativeElement.lastChild;
                if (table.lastChild && table.lastChild.scrollIntoView) {
                    table.lastChild.scrollIntoView({block: 'start', behavior: 'smooth'});
                }
            }, 10);
        });
    }

    get soundEnabled() {
        return this.options.soundEnabled;
    }

    get srSupported() {
        return this.speechRecognitionService.isSupported();
    }

    get backendSoundState() {
        return this.backendSound.checkBackendSoundState();
    }

    get keyboardActive() {
        return this._keyboardActive;
    }

    /**
     * Send current input Field input
     */
    sendTextFieldMessage() {
        if (this.commandTextValue.trim().length > 0) {
            this.chat.addMessage(USER_CHAT_NAME[this.options.language], this.commandTextValue, false);
            this.commandHandler.sendCommand(this.commandTextValue, false);
        }
        this.commandTextValue = '';
        return false;
    }

    /**
     * Send the srResponse to Backend and Chat
     * @param command String of the Command
     */
    private srResponse(command: string) {
        if (this.srState === 'active') {
            this.chat.addMessage(USER_CHAT_NAME[this.options.language], command, false);
            this.commandHandler.sendCommand(command, true);
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
        if (this.backendSound.checkBackendSoundState()) {
            this.backendSound.mute().subscribe();
        } else {
            this.backendSound.unmute().subscribe();
        }
    }

    /**
     * Activate/Deactivate the SR
     */
    triggerSR() {
        if (this.srState !== 'active') {
            this.srState = 'active';
            if (this.backendSound.checkBackendSoundState()) {
                this.backendSoundMuted = true;
                this.backendSound.mute().subscribe();
            }
            this.speechRecognitionService.recognize((result) => {
                this.srResponse(result);
                this.srState = 'inactive';
                if (this.backendSoundMuted) {
                    this.backendSoundMuted = false;
                    this.backendSound.unmute().subscribe();
                }
            });
        } else {
            this.srState = 'inactive';
            if (this.backendSoundMuted) {
                this.backendSoundMuted = false;
                this.backendSound.unmute().subscribe();
            }
            this.speechRecognitionService.cancelRecognition();
        }
    }

    /**
     * activate/deactovate input field
     */
    triggerKeyboard() {
        if (!this._keyboardActive) {
            this._keyboardActive = true;
            setTimeout(() => {
                this.inputField.nativeElement.focus();
            }, 100);
        } else {
            this._keyboardActive = false;
            this.commandTextValue = '';
        }
        return false;
    }
}
