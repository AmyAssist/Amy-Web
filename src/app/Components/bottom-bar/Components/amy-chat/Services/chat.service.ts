import { Injectable, NgZone } from '@angular/core';
import { Message } from '../Objects/message';
import { TTSService } from '../../../../../Services/tts.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly zone = new NgZone({ enableLongStackTrace: false });

  constructor(
    private readonly ttsService: TTSService) { }

  private readonly messages: Message[] = [];

  /**
     * Add a Message to the Visible Chat
     * @param name Name of the Message Source
     * @param value String of the Message
     */
  public addMessage(name: string, value: string, readLoud: boolean) {
    this.zone.run(() => {
      this.messages.push({ name, value });
    });
    if (readLoud) {
      this.ttsService.speak(value);
    }

  }

  getMessages() {
    return this.messages;
  }
}
