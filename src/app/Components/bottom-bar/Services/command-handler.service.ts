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

  response: string;

  private readonly errorStateMatcher = new CommandErrorStateMatcher();

  private uuid: string;

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
        this.chat.addMessage(AMY_CHAT_NAME[this.options.getLanguage()], data, false);
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
    }, error => {
      this.response = null;
      this.errorStateMatcher.error = true;
      this.chat.addMessage(AMY_CHAT_NAME[this.options.getLanguage()], AMY_UNKNOWN_COMMAND_RESPONSE[this.options.getLanguage()], readResponse);

    });
  }
}
