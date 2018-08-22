import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Command } from '../Objects/command';
import { BackendResolver } from '../Services/backendResolver.service';

import { v4 as uuid } from 'uuid';


/*
    Service for providing and receiving data from the REST interface that is used for general functions of the application.
*/
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    uuid: string = uuid();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain'
        }),
        responseType: 'text' as 'text'
    };

    constructor(private readonly http: HttpClient, private readonly backend: BackendResolver) {    }

    /**
     * Function to send typed commands to the backend and receive the response
     */
    sendCommand(commandData: Command) {
        return this.http.post(this.backend.backendPath + 'home/console', commandData.value, this.httpOptions);
    }

    registerChat() {
        return this.http.post(this.backend.backendPath + 'home/register', uuid, this.httpOptions);
    }

    checkForResponses() {
        return this.http.post(this.backend.backendPath + 'home/response', uuid, this.httpOptions)
    }
}
