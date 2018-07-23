import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { BackendResolver } from '../../../Services/backendResolver.service';
import {throwError} from 'rxjs';
import {Location} from '../Objects/location';

@Injectable({
    providedIn: 'root'
})
export class LocationRegistryDataService {
    path: string;

    httpOptionsSendJSON = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    httpOptionsReceiveJSON = {
        headers: new HttpHeaders({
            'Accept': 'application/json'
        })
    };

    generateHeaders(sendJSON: boolean, receiveJSON: boolean) {
        const r = {};
        if (sendJSON) {
            Object.assign(r, this.httpOptionsSendJSON);
        }
        if (receiveJSON) {
            Object.assign(r, this.httpOptionsReceiveJSON);
        }
        return r;
    }

    constructor(private readonly http: HttpClient, private readonly backend: BackendResolver) {
        this.path = backend.backendPath + 'registry/location/';
    }


    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', errorResponse.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${errorResponse.status}, ` +
                `body was: ${errorResponse.error}`);
            return throwError('Error: ' + errorResponse.error.toString());
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }


    getAll() {
        return this.http.get<Location[]>(this.path + 'all', this.generateHeaders(false, true)).pipe(catchError(this.handleError));
    }

    getById(id: number) {
        return this.http.get<Location>(this.path + id, this.generateHeaders(false, true)).pipe(catchError(this.handleError));
    }

    deleteById(id: number) {
        return this.http.delete(this.path + id, this.generateHeaders(false, false)).pipe(catchError(this.handleError));
    }

    /**
     *
     * @param {Location} l
     * @returns {Observable<Location>} the newly created entity with primary key set
     */
    post(l: Location) {
        return this.http.post<Location>(this.path, l, this.generateHeaders(true, true)).pipe(catchError(this.handleError));
    }
}
