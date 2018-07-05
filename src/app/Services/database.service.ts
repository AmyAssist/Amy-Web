import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';

import { command } from '../Objects/command';


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
      'Content-Type':  'text/plain'
    })
  };
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient) { 
    this.path = 'http://localhost:8080/rest/home/';
  }

  /*
    Function to send typed commands to the backend
  */
  sendCommand(commandData: command){
    this.http.post<string>(this.path + 'console', commandData.value, this.httpOptions).pipe(
      catchError(this.handleError));
  }
}