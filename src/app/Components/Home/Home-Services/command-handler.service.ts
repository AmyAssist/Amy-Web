import { Injectable, OnInit } from '@angular/core';
import { DatabaseService } from '../../../Services/database.service';
import { Command } from '../../../Objects/command';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ErrorStateMatcher } from '@angular/material/core';
import { AMY_CHAT_NAME, AMY_UNKNOWN_COMMAND_RESPONSE } from '../../../Constants/strings';
import { OptionsService } from '../../../Services/options.service';
import { ChatService } from './chat.service';
import {BackendResolver} from '../../../Services/backendResolver.service';
import {WebSocketSubject} from 'rxjs/webSocket';

export class CommandErrorStateMatcher implements ErrorStateMatcher {
    error = false;
    isErrorState(control, form) {
        return this.error;
    }
}

class ChatMessage {
    msg: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommandHandlerService {
    // shall the response of the KI backend system be read out loud
    private readResponseState = false;

    private socket: WebSocketSubject<ChatMessage | string> = null;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly chat: ChatService,
        private readonly options: OptionsService,
        private readonly backendResolver: BackendResolver) {

        this.socket = new WebSocketSubject(this.generateWebSocketURL());
        this.socket.subscribe((data) => {
            this.chat.addMessage(AMY_CHAT_NAME[this.options.language], (data as ChatMessage).msg, this.readResponseState);
        }, (error) => {
            console.error(`WebSocket error: ${error}`);
        }, () => {
            console.error('WebSocket closed');
        });
    }

    private generateWebSocketURL(): string {
        const restURL = this.backendResolver.backendURL.getValue();
        const port = 6661;
        return restURL.replace(/http(s)?:\/\/(.*):([0-9]{1,})(\/.*)?/, `ws$1://$2:${port}`);
    }



    /**
     * Sending typed command to the backend-service for general functions.
     * @param commandValue String consisting of the Command
     * @param readResponse Boolean that describes if the response shoudl be read out loud
     */
    public sendCommand(commandValue: string, readResponse: boolean) {

        this.readResponseState = readResponse;

        this.socket.next(commandValue);
    }
}
