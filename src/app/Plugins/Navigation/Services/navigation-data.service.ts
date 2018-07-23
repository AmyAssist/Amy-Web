import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { NavPath } from '../Objects/navPath';
import { BackendResolver } from '../../../Services/backendResolver.service';


@Injectable({
  providedIn: 'root'
})
export class NavigationDataService {

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
    this.path = backend.backendPath + 'navigation/';
  }

  fromTo(wayData: NavPath): Observable<any> {
    return this.http.post(this.path + 'fromTo', wayData, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  when(wayData: NavPath) {
    return this.http.post(this.path + 'when', wayData, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    }).pipe(
      catchError(this.handleError));
  }

  best(wayData: NavPath) {
    return this.http.post(this.path + 'best', wayData, this.httpOptions).pipe(
      catchError(this.handleError));
  }
}
