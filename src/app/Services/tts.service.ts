import { Injectable } from '@angular/core';
import { OptionsService } from './options.service';

/**
 *   Service as abstraction of the SpeechSynthesis API of the browser
 */
@Injectable({
    providedIn: 'root'
})
export class TTSService {

    private readonly synth: SpeechSynthesis;

    constructor(
        private readonly options: OptionsService) {
        this.synth = window.speechSynthesis;
    }

    /**
     * Function to send typed commands to the backend
     */
    speak(text: string) {
        if (this.options.soundEnabled) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            this.synth.speak(utterance);
        }
    }

    /**
     * Stop the current Voice Output
     */
    stop() {
        this.synth.cancel();
    }

    get currentlyOutputting() {
        return this.synth.speaking;
    }
}
