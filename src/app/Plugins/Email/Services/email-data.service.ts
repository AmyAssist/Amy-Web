import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendResolver } from '../../../Services/backendResolver.service';
import { MessageDTO } from '../../Email/Objects/MessageDTO';

@Injectable({
    providedIn: 'root'
})
export class EmailDataService {
    path: string;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) {
        this.setupPath();
    }

    setupPath() {
        this.path = this.backend.backendPath + 'email/';
    }

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

    getMails() {
        return this.http.get<MessageDTO[]>(this.path + 'getMails', this.httpOptions).pipe(
            catchError(this.handleError));
    }
}
