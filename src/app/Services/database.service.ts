import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { command } from '../Objects/command'


/*
    Service for providing and receiving data from the REST interface.
*/
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  path: string;

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/';
  }

  /*
    Getting the current command for the web application.
  */
 /*
  getCommand(commandData: command): Observable<command> {
    return this.http.post<command>('rest/command', commandData, httpOptions);
  } */
  playSong(commandData: command){
    this.http.post<command>(this.path + 'play', commandData, httpOptions);
  }
}


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};