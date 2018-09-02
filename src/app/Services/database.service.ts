import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Command } from '../Objects/command';
import { BackendResolver } from '../Services/backendResolver.service';


/*
    Service for providing and receiving data from the REST interface that is used for general functions of the application.
*/
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain'
        }),
        responseType: 'text' as 'text'
    };

    constructor(
        private readonly http: HttpClient,
        private readonly backend: BackendResolver) { }

    /**
     * Function to send typed commands to the backend and receive the response
     */
    sendCommand(commandData: Command, uuid: string) {
        let params = new HttpParams();
        params = params.append('langInput', commandData.value);
        params = params.append('clientUUID', uuid);
        return this.http.post(this.backend.backendURL.getValue() + 'chat/input', null, { params });
    }

    registerChat() {
        return this.http.post(this.backend.backendURL.getValue() + 'chat/register', null, this.httpOptions);
    }

    checkForResponses(uuid: string) {
        return this.http.post(this.backend.backendURL.getValue() + 'chat/response', uuid, this.httpOptions);
    }
}

