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

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text'
  };

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
    this.path = backend.backendPath + 'navigation/';
  }

  fromTo(wayData: NavPath) {
    return this.http.post(this.path + 'fromTo', wayData, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  when(wayData: NavPath) {
    return this.http.post(this.path + 'when', wayData, this.httpOptions2).pipe(
      catchError(this.handleError));
  }

  best(wayData: NavPath) {
    return this.http.post(this.path + 'best', wayData, this.httpOptions).pipe(
      catchError(this.handleError));
  }
}
