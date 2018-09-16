import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WebAppServerInfo } from '../Objects/WebAppServerInfo';

@Injectable({
  providedIn: 'root'
})
export class WebAppServerInfoService {
  constructor(private readonly http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getWebAppServerInfo() {
    return this.http.get<WebAppServerInfo>('webAppServerInfo.json');
  }
}
