import { Component, OnInit } from '@angular/core';
import { ChatService } from './Services/chat.service';
import { Message } from './Objects/message';
import { AMY_CHAT_NAME } from '../../../../Constants/strings';
import { OptionsService } from '../../../../Services/options.service';

@Component({
  selector: 'app-amy-chat',
  templateUrl: './amy-chat.component.html',
  styleUrls: ['./amy-chat.component.css']
})
export class AmyChatComponent implements OnInit {


  constructor(
    private readonly chat: ChatService,
    private readonly options: OptionsService
  ) { }

  ngOnInit() {
  }

  isResponse(message: Message){
    return message.from === AMY_CHAT_NAME[this.options.language];
  }

  getMessages() {
    return this.chat.getMessages();
  }

}
