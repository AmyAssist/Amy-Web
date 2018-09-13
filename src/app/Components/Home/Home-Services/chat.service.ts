import { Injectable, NgZone } from '@angular/core';
import { TTSService } from '../../../Services/tts.service';
import { Message } from '../Home-Objects/message';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly zone = new NgZone({ enableLongStackTrace: false });

  constructor(
    private readonly ttsService: TTSService) { }

  private readonly messages: Message[] = [];
  public stream: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  /**
     * Add a Message to the Visible Chat
     * @param name Name of the Message Source
     * @param value String of the Message
     */
  public addMessage(from: string, value: string, readLoud: boolean) {
    this.messages.push({ from, value });
    this.stream.next(this.messages);
    if (readLoud) {
      this.ttsService.speak(value);
    }

  }

  getMessages() {
    return this.messages;
  }
}
