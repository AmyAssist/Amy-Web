import {Injectable} from '@angular/core';

/**
 *   Service as abstraction of the SpeechSynthesis API of the browser
 */
@Injectable({
    providedIn: 'root'
})
export class TTSService {

    private readonly synth: SpeechSynthesis;

    constructor() {
        this.synth = window.speechSynthesis;
    }

    /**
     * Function to send typed commands to the backend
     */
    speak(text: string) {
        const utterance = new SpeechSynthesisUtterance(text);
        this.synth.speak(utterance);
    }
}
