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
            'Content-Type': 'text/plain'
        })
    };

    constructor(private http: HttpClient) {
        this.path = 'http://localhost:8080/rest/email/';
    }

    private handleError(error: HttpErrorResponse) {
        /*
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
        */
        console.error(error);
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

    getImportantMails(amount: number) {
        let params = new HttpParams();
        params = params.append('amount', amount.toString());
        return this.http.post(this.path + 'plains/important', null, { params: params }).pipe(
            catchError(this.handleError));

    }

    getAllMails(amount: number) {
        let params = new HttpParams();
        params = params.append('amount', amount.toString());
        return this.http.post(this.path + 'plains', null, { params: params }).pipe(
            catchError(this.handleError));
    }
}