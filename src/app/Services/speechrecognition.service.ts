import { Injectable, ApplicationRef } from '@angular/core';

interface Result extends Event {
    readonly results: any;
}

declare class SpeechRecognition {
    lang: string;
    onspeechend: () => void;
    onresult: (event: Result) => void;
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

    cancelRecognition(){
        this.sr.stop();
    }

    private onresult(event: Result) {
        const last = event.results.length - 1;
        let text: string = event.results[last][0].transcript;
        // this is only temporary. the grammars in the server don't allow : and .
        text = text.replace(/:/g, ' x ');
        text = text.replace(/p.m./gi, 'pm');
        text = text.replace(/a.m./gi, 'am');
        for (const callbackFunc of this.activeCallbacks) {
            callbackFunc(text);
        }
        this.activeCallbacks = [];
        this.ref.tick();
    }
}
