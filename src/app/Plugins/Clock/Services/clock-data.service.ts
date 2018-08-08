import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Clock } from '../Objects/clock';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
  providedIn: 'root'
})
export class ClockDataService {

  path: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
    this.setupPath();
  }

  setupPath(){
    this.path = this.backend.backendPath + 'clock/'; // Path for all Data concerning the clock-plugin
  }

  /*
    Getting all from Rest-Backend Alarms.
  */
  getAlarms() {
    return this.http.get<Clock[]>(this.path + 'alarms', this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Sending a new Alarm to the REST-Backend.
  */
  setNewAlarm(clockData: Clock): Observable<Clock> {
    return this.http.post<Clock>(this.path + 'alarms/new', clockData, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Get one specific Alarm
  */
  getSpecificAlarm(){
    return this.http.get<Clock>(this.path + 'alarms/alarmnumber', this.httpOptions).pipe(catchError(this.handleError));
  }

  /*
  Edit Alarms
    AlarmId muss noch mitgegeben werden.
  */
  editAlarms(clockData: Clock): Observable<Clock> {
    return this.http.post<Clock>(this.path + 'alarms/alarmnumber', clockData, this.httpOptions).pipe(catchError(this.handleError));
  }
}
