import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
    providedIn: 'root'
})
export class EmailDataService {
    get path() {
        return this.backend.backendURL.getValue() + 'email/';
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain'
        }),
        responseType: 'text' as 'text'
    };

    constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        return throwError(error);
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
