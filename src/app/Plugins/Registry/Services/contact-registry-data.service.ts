import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BackendResolver } from '../../../Services/backendResolver.service';
import { throwError } from 'rxjs';
import { Location } from '../Objects/location';
import { Contact } from '../Objects/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactRegistryDataService {
    get path() {
        return this.backend.backendURL.getValue() + 'registry/contact/';
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

    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }


    getAll() {
        return this.http.get<Contact[]>(this.path + 'all', this.generateHeaders(false, true)).pipe(catchError(this.handleError));
    }

    getById(id: number) {
        return this.http.get<Contact>(this.path + id, this.generateHeaders(false, true)).pipe(catchError(this.handleError));
    }

    deleteById(id: number) {
        return this.http.delete(this.path + id, this.generateHeaders(false, false)).pipe(catchError(this.handleError));
    }

    /**
     *
     * @param {Location} l
     * @returns {Observable<Location>} the newly created entity with primary key set
     */
    post(c: Contact) {
        return this.http.post<Contact>(this.path, c, this.generateHeaders(true, true)).pipe(catchError(this.handleError));
    }
}
