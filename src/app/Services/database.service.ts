import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, retry } from 'rxjs/operators';

import {Command} from '../Objects/command';


/*
    Service for providing and receiving data from the REST interface that is used for general functions of the application.
*/
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    path: string;
  
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain'
        }),
        responseType: 'text' as 'text'
    };

    constructor(private http: HttpClient) {
        this.path = 'http://localhost:8080/rest/home/';
    }

    /**
     * Function to send typed commands to the backend and receive the response
     */
    sendCommand(commandData: Command) {
        return this.http.post(this.path + 'console', commandData.value, this.httpOptions);
    }
}