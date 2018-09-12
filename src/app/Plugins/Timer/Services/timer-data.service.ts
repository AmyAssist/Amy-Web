import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Timer } from '../Objects/timer';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
  providedIn: 'root'
})
export class TimerDataService {
  /**
   * Path for all Data concerning the timer-plugin
   */
  get path() {
    return this.backend.backendURL.getValue() + 'timer/';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
  }

  /*
    Getting all from Rest-Backend Timers.
  */
  getTimers() {
    return this.http.get<Timer[]>(`${this.path}timers`, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Sending a new Timer to the REST-Backend.
  */
  setNewTimer(timerData: Timer): Observable<Timer> {
    return this.http.post<Timer>(`${this.path}timers/new`, timerData, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  /*
    Get one specific Timer
  */
  getSpecificTimer() {
    return this.http.get<Timer>(`${this.path}timers/timerNumber`, this.httpOptions).pipe(catchError(this.handleError));
  }


  /*
    Delete Timers
  */
  deleteTimer(timernumber: number): Observable<Timer[]> {
    return this.http.post<Timer[]>(`${this.path}timers/delete/${timernumber}`, this.httpOptions).pipe(catchError(this.handleError));
  }

}
