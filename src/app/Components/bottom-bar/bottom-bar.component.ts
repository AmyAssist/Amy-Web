import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from '../../Services/speechrecognition.service';
import { TTSService } from '../../Services/tts.service';
import { USER_CHAT_NAME } from '../../Constants/strings';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommandHandlerService } from './Services/command-handler.service';
import { ChatService } from './Components/amy-chat/Services/chat.service';
import { OptionsService } from '../../Services/options.service';
import { BackendResolver } from '../../Services/backendResolver.service';


@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css'],
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
export class BottomBarComponent implements OnInit {

    private _displayBar = true;

    srState = 'inactive';

    backendSoundMuted = false;

    test: string;

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

    get displayBar() {
        return this._displayBar;
    }

    get displayChat() {
        return this.options.displayChat;
    }

    /**
     * Trigger the displayal of the bottom Bar
     */
    changeBarDisplayal() {
        if (this.displayBar) {
            this._displayBar = false;
        } else {
            this._displayBar = true;
        }
    }

    /**
     * Trigger the displayal of the chat window
     */
    changeChatDisplayal() {
        if (this.displayChat) {
            this.options.displayChat = false;
        } else {
            this.options.displayChat = true;
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
            this.chat.addMessage(USER_CHAT_NAME[this.options.language], command, false);
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
