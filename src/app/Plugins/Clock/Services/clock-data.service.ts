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
  alarmid: () => string;

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
    this.setupPath();
  }

  setupPath() {
    this.path = this.backend.backendPath + 'clock/'; // Path for all Data concerning the clock-plugin
  }

  /*
    Getting all from Rest-Backend Alarms.
  */
  getAlarms() {
    return this.http.get<Clock[]>(`${this.path}alarms`, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Sending a new Alarm to the REST-Backend.
  */
  setNewAlarm(clockData: Clock): Observable<Clock> {
    return this.http.post<Clock>(`${this.path}alarms/new`, clockData, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Get one specific Alarm
  */
  getSpecificAlarm() {
    return this.http.get<Clock>(`${this.path}alarms/alarmnumber`, this.httpOptions).pipe(catchError(this.handleError));
  }

  /*
    Edit Alarms
  */
  editAlarm(alarmnumber: number, clockData: Clock): Observable<Clock> {
    return this.http.post<Clock>(`${this.path}alarms/${alarmnumber}`, clockData, this.httpOptions).pipe(catchError(this.handleError));
  }

  /*
    Activate and Deactivate Alarms
  */
  activatedeactivateAlarm(alarmnumber: number, clockData: Clock): Observable<Clock> {
    return this.http.post<Clock>(`${this.path}alarms/de.activate/${alarmnumber}`, clockData, this.httpOptions).pipe(catchError(this.handleError));
  }

  /*
    Delete Alarms
  */
  deleteAlarm(alarmnumber: number): Observable<Clock[]> {
    return this.http.post<Clock[]>(`${this.path}'alarms/delete/'${alarmnumber}`, this.httpOptions).pipe(catchError(this.handleError));
  }

}
