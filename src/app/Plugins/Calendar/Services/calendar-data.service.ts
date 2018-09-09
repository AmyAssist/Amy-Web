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

  get path() {
    return this.backend.backendURL.getValue() + 'calendar/';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
  }

  getEvents(date: string) {
    return this.http.get<CalendarEvent[]>(`${this.path}eventsAt/${date}`, this.httpOptions).pipe(
      catchError(this.handleError)).pipe(map((response: CalendarEvent[]) => {
        response.forEach(l => Object.setPrototypeOf(l, new CalendarEvent()));
        return response;
      }));
  }

  setNewEvent(eventData: CalendarEvent) {
    return this.http.post<CalendarEvent>(`${this.path}events/set`, eventData, this.httpOptions).pipe(catchError(this.handleError));
  }

}
