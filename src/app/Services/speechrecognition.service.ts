import {Injectable, ApplicationRef} from '@angular/core';

interface result extends Event {
    readonly results: any;
}

declare class SpeechRecognition {
    lang: string;
    onspeechend: () => void;
    onresult: (event: result) => void;
    start(): void;
    stop(): void;
    abort(): void;
}
declare class webkitSpeechRecognition extends SpeechRecognition {
    constructor();
}

type Callback = (result: string) => void;

/**
 *   Service as abstraction of the SpeechSynthesis API of the browser
 */
@Injectable({
    providedIn: 'root'
})
export class SpeechRecognitionService {

    private readonly sr: SpeechRecognition;
    private activeCallbacks: Array<Callback> = [];

    constructor(private readonly ref: ApplicationRef) {
        this.sr = new webkitSpeechRecognition();
        this.sr.lang = 'en-US';
        this.sr.onspeechend = () => {
            this.sr.stop();
        };
        this.sr.onresult = this.onresult.bind(this);
    }

    recognize(callbackFunc: Callback) {
        this.activeCallbacks.push(callbackFunc);
        this.sr.start();
    }

    private onresult(event: result) {
        const last = event.results.length - 1;
        const text: string = event.results[last][0].transcript;

        for (const callbackFunc of this.activeCallbacks) {
            callbackFunc(text);
        }
        this.activeCallbacks = [];
        this.ref.tick();
    }
}
