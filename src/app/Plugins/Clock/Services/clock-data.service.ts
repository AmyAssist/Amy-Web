import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { clock } from '../Objects/clock';
import { Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockDataService {

  path: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
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
    this.path = 'http://localhost:8080/rest/clock/'; //Path for all Data concerning the clock-plugin
  }

  /*
    Getting all from Rest-Backend Alarms.
  */
  getAlarms() {
    return this.http.get<clock[]>(this.path + 'alarms', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Sending a new Alarm to the REST-Backend.
  */
  setNewAlarm(clockData: clock): Observable<clock> {
    return this.http.post<clock>(this.path + 'alarms/new', clockData, this.httpOptions).pipe(
      catchError(this.handleError));
  }
}