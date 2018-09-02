import { Injectable, OnInit } from '@angular/core';
import { DatabaseService } from '../../../Services/database.service';
import { Command } from '../../../Objects/command';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ErrorStateMatcher } from '@angular/material/core';
import { ChatService } from '../Components/amy-chat/Services/chat.service';
import { AMY_CHAT_NAME, AMY_UNKNOWN_COMMAND_RESPONSE } from '../../../Constants/strings';
import { OptionsService } from '../../../Services/options.service';

export class CommandErrorStateMatcher implements ErrorStateMatcher {
  error = false;
  isErrorState(control, form) {
    return this.error;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommandHandlerService {

  private readonly errorStateMatcher = new CommandErrorStateMatcher();

  //UUID -> id representing this conversation with the KI backend system
  private uuid: string;

  //response of the KI backend system
  response: string;

  //shall the respnse of the KI backend system be read out loud
  private readResponseState = false;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly chat: ChatService,
    private readonly options: OptionsService) {
    this.databaseService.registerChat().subscribe(r => {
      if (r) {
        this.uuid = r;
        this.startCheckingForResponses(this.uuid);
      }
    });
  }

  private startCheckingForResponses(uuid: string) {
    interval(1000).pipe(mergeMap(() => this.databaseService.checkForResponses(uuid))).subscribe(data => {
      console.log(data);
      if (data) {
        this.chat.addMessage(true, AMY_CHAT_NAME[this.options.language], data, this.readResponseState);
      }

    }, error => {
      console.log('failed to fetch');
    });
  }

  /**
   * Sending typed command to the backend-service for general functions.
   * @param commandValue String consisting of the Command
   * @param readResponse Boolean that describes if the response shoudl be read out loud
   */
  public sendCommand(commandValue: string, readResponse: boolean) {
    const commandData = new Command(commandValue);
    this.databaseService.sendCommand(commandData, this.uuid).subscribe(r => {
      this.errorStateMatcher.error = false;
      this.readResponseState = readResponse;
    }, error => {
      this.response = null;
      this.errorStateMatcher.error = true;
      this.chat.addMessage(true, AMY_CHAT_NAME[this.options.language], AMY_UNKNOWN_COMMAND_RESPONSE[this.options.language], readResponse);

    });
  }
}
