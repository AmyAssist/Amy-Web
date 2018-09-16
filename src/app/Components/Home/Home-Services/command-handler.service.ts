import { Injectable, OnInit } from '@angular/core';
import { Command } from '../../../Objects/command';
import {interval, Observable} from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ErrorStateMatcher } from '@angular/material/core';
import { AMY_CHAT_NAME, AMY_UNKNOWN_COMMAND_RESPONSE } from '../../../Constants/strings';
import { OptionsService } from '../../../Services/options.service';
import { ChatService } from './chat.service';
import {BackendResolver} from '../../../Services/backendResolver.service';
import {WebSocketSubject} from 'rxjs/webSocket';
import {HttpClient} from '@angular/common/http';

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
        private readonly chat: ChatService,
        private readonly options: OptionsService,
        private readonly backendResolver: BackendResolver,
        private readonly http: HttpClient) {

        // Get a stream of backend URLs (the user may change the backend URL)
        this.backendResolver.backendURL.subscribe(backendURL => {
            // Get websocket stream URL via http rest api
            this.getWebSocketURL(backendURL).subscribe(url => {
                // start websocket stream
                if (this.socket != null) {
                    // Close old websocket connection
                    this.socket.unsubscribe();
                }
                this.socket = new WebSocketSubject(url);
                this.socket.subscribe((data) => {
                    this.chat.addMessage(AMY_CHAT_NAME[this.options.language], (data as ChatMessage).msg, this.readResponseState);
                }, (error) => {
                    console.error(`WebSocket error: ${error}`);
                }, () => {
                    console.warn('WebSocket closed');
                });
            }, error => {
                console.error('Error getting websocket url from server');
            });
        });
    }

    private getWebSocketURL(backendURL: string): Observable<string> {
        return this.http.get(backendURL + 'chat/url', { responseType: 'text' });
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
