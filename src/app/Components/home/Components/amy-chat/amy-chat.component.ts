import { Component, OnInit } from '@angular/core';
import { ChatService } from './Services/chat.service';
import { Message } from './Objects/message';

@Component({
  selector: 'app-amy-chat',
  templateUrl: './amy-chat.component.html',
  styleUrls: ['./amy-chat.component.css']
})
export class AmyChatComponent implements OnInit {


  constructor(private readonly chat: ChatService) { }

  ngOnInit() {
  }

  isResponse(message: Message){
    return message.isResponse;
  }

  getMessages() {
    return this.chat.getMessages();
  }

}
