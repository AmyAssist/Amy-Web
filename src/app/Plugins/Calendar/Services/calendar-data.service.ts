import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CalendarEvent } from '../Objects/CalendarEvent';
import { BackendResolver } from '../../../Services/backendResolver.service';
/*
  service for getting information from the calendar plugin
  @author: Florian Bauer
*/
@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  path: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
    this.path = backend.backendPath + 'calendar/';
  }

  getEvents(date: string) {
    return this.http.get<CalendarEvent[]>(`${this.path}eventsAt/${date}`, this.httpOptions).pipe(
      catchError(this.handleError)).pipe(map((response: CalendarEvent[]) => {
        response.forEach(l => Object.setPrototypeOf(l, new CalendarEvent()));
        return response;
      }));
  }

  getEventsAsString(date: string) {
    return this.http.get<string>(`${this.path}eventsAtString/${date}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  getEventsToday() {
    return this.http.get<string>(`${this.path}events/today`, this.httpOptions).pipe(catchError(this.handleError));
  }

  getEventsTomorrow() {
    return this.http.get<string>(`${this.path}events/tomorrow`, this.httpOptions).pipe(catchError(this.handleError));
  }

  setNewEvent(eventData: CalendarEvent) {
    return this.http.post<CalendarEvent>(`${this.path}events/set`, this.httpOptions).pipe(catchError(this.handleError));
  }
}
