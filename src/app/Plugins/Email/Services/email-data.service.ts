import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmailDataService {
    path: string;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
        this.path = 'http://localhost:8080/rest/email/';
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
        return this.http.get<number>(this.path + 'new/count', this.httpOptions).pipe(
            catchError(this.handleError));
    }

    hasUnreadMessages() {
        return this.http.get<Boolean>(this.path + 'unread', this.httpOptions).pipe(
            catchError(this.handleError));
    }

    getImportantMails() {
        return this.http.post<String>(this.path + 'plains/important', this.httpOptions).pipe(
            catchError(this.handleError));
        
    }

    getAllMails() {
        return this.http.post<String>(this.path + 'plains', this.httpOptions).pipe(
            catchError(this.handleError));
    }
}