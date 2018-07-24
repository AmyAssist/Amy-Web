import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
    providedIn: 'root'
})
export class EmailDataService {
    path: string;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain'
        }),
        responseType: 'text' as 'text'
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

    amountNewMessages() {
        return this.http.get(this.path + 'new/count').pipe(
            catchError(this.handleError));
    }

    hasUnreadMessages() {
        return this.http.get(this.path + 'unread').pipe(
            catchError(this.handleError));
    }

    getMails(amount: number, important: boolean) {
        let params = new HttpParams();
        params = params.append('amount', amount.toString());
        if (important) {
            return this.http.post(this.path + 'plains/important', { params }, this.httpOptions).pipe(
                catchError(this.handleError));
        }
        return this.http.post(this.path + 'plains', { params }, this.httpOptions).pipe(
            catchError(this.handleError));
    }
}
