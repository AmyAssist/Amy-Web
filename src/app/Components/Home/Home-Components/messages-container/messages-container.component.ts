import { Component, OnInit } from '@angular/core';
import { AMY_CHAT_NAME } from '../../../../Constants/strings';
import { OptionsService } from '../../../../Services/options.service';
import { Message } from '../../Home-Objects/message';
import { ChatService } from '../../Home-Services/chat.service';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.css']
})
export class MessagesContainerComponent implements OnInit {


  constructor(
    protected readonly chat: ChatService,
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
