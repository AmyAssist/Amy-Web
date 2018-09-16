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

  events: CalendarEvent[];
  selectedDate: string;

  get path() {
    return this.backend.backendURL.getValue() + 'calendar/';
  }

  httpPlainTextOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  httpJsonOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
  }

  getEvents(): CalendarEvent[] {
    return this.events;
  }

  updateEvents(): void {
    if (this.selectedDate !== '') {
      this.http.get<CalendarEvent[]>(`${this.path}eventsAt/${this.selectedDate}`, this.httpPlainTextOptions).pipe(
        catchError(this.handleError)).pipe(map((response: CalendarEvent[]) => {
          response.forEach(l => Object.setPrototypeOf(l, new CalendarEvent()));
          return response;
        })).subscribe((data: CalendarEvent[]) => {
          this.events = [...data];
        });
    } else {
      this.resetEvents();
    }
  }

  setSelectedDate(date: string): void {
    if (this.selectedDate !== date) {
      this.selectedDate = date;
      this.updateEvents();
    }
  }

  getSelectedDate(): string {
    return this.selectedDate;
  }

  resetEvents(): void {
    this.events = [];
  }

  setNewEvent(eventData: CalendarEvent) {
    return this.http.post<CalendarEvent>(`${this.path}events/set`, eventData, this.httpJsonOptions)
      .pipe(catchError(this.handleError)).subscribe(() => this.updateEvents());
  }

}
