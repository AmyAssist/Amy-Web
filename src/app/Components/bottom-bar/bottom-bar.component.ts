import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from '../../Services/speechrecognition.service';
import { TTSService } from '../../Services/tts.service';
import { CHAT_DISPLAY_BUTTON_ACTIVE, CHAT_DISPLAY_BUTTON_INACTIVE, USER_CHAT_NAME } from '../../Constants/strings';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommandHandlerService } from './Services/command-handler.service';
import { ChatService } from './Components/amy-chat/Services/chat.service';
import { OptionsService } from '../../Services/options.service';



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



    buttonName: string = CHAT_DISPLAY_BUTTON_INACTIVE[this.options.getLanguage()];

    srState = 'inactive';

    test: string;


    constructor(
        private readonly speechRecognitionService: SpeechRecognitionService,
        private readonly ttsService: TTSService,
        private readonly options: OptionsService,
        private readonly commandHandler: CommandHandlerService,
        private readonly chat: ChatService) { }


    ngOnInit() {
    }

    displayChat(){
        return this.options.shallDisplayChat();
    }

    muteGlobally(){
        this.options.muteSound;
    }

    unmuteGlobally(){
        this.options.unmuteSound;
    }

    /**
     * Trigger the displayal of the chat window
     */
    changeDisplayState() {
        if (!this.displayChat()) {
            this.options.setDisplayChat(true);
            this.buttonName = CHAT_DISPLAY_BUTTON_ACTIVE[this.options.getLanguage()];
        } else {
            this.options.setDisplayChat(false);
            this.buttonName = CHAT_DISPLAY_BUTTON_INACTIVE[this.options.getLanguage()];
        }
    }

    /**
     * Stop the current tts
     */
    stopOutput() {
        this.ttsService.stop();
    }

    /**
     * Send the srResponse to Backend and Chat
     * @param command String of the Command
     */
    private srResponse(command: string) {
        if (this.srState === 'active') {
            this.chat.addMessage(USER_CHAT_NAME[this.options.getLanguage()], command, false);
            this.commandHandler.sendCommand(command, true);
        }
    }

    /**
     * Activate/Deactivate the SR
     */
    triggerSR() {
        if (this.srState !== 'active') {
            this.srState = 'active';
            this.speechRecognitionService.recognize((result) => {
                this.srResponse(result);
                this.srState = 'inactive';
            });
        } else {
            this.srState = 'inactive';
            this.speechRecognitionService.cancelRecognition();
        }
    }
}
