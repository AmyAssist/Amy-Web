import { Component, OnInit } from '@angular/core';
import { COMMAND_INPUT_PLACEHOLDER, USER_CHAT_NAME } from '../../../../Constants/strings';
import { OptionsService } from '../../../../Services/options.service';
import { ChatService } from './Services/chat.service';
import { CommandHandlerService } from '../../Services/command-handler.service';

@Component({
  selector: 'app-amy-chat',
  templateUrl: './amy-chat.component.html',
  styleUrls: ['./amy-chat.component.css']
})
export class AmyChatComponent implements OnInit {

  commandInputPlaceholder: string = COMMAND_INPUT_PLACEHOLDER[this.options.getLanguage()];

  commandTextValue = '';

  constructor(
    private readonly options: OptionsService,
    private readonly chat: ChatService,
    private readonly commandHandler: CommandHandlerService) { }

  ngOnInit() {
  }

  getMessages() {
    return this.chat.getMessages();
  }

  sendTextFieldMessage() {
    this.chat.addMessage(USER_CHAT_NAME[this.options.getLanguage()], this.commandTextValue, false);
    this.commandHandler.sendCommand(this.commandTextValue, false);
    this.commandTextValue = '';
  }

}
