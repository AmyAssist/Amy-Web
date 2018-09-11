import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '../Objects/location';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  get path() {
    return this.backend.backendURL.getValue();
  }
  pathRegistry: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpPlainTextHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  };

  constructor(private readonly http: HttpClient, private readonly backend: BackendResolver) { }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getWeatherReport(id: number) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.path + 'weather/report/', { params }).pipe(
      catchError(this.handleError));
  }

  /*
    gets all loctaions from the registry
  */
  getAllLocations() {
    return this.http.get<Location[]>(this.path + 'registry/location/all').pipe(
      catchError(this.handleError));
  }

}
