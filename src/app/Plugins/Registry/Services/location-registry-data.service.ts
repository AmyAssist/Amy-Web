import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BackendResolver } from '../../../Services/backendResolver.service';
import { throwError } from 'rxjs';
import { Location } from '../Objects/location';

@Injectable({
    providedIn: 'root'
})
export class LocationRegistryDataService {
    get path() {
        return this.backend.backendURL.getValue() + 'registry/location/';
    }

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

    constructor(private readonly http: HttpClient, private readonly backend: BackendResolver) { }

    private handleError(errorResponse: HttpErrorResponse) {
        return throwError(errorResponse);
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
