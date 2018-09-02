import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BackendResolver } from '../../../Services/backendResolver.service';
import { MessageDTO } from '../../Email/Objects/MessageDTO';
import { EMailCredentials } from '../../Email/Objects/EMailCredentials';

@Injectable({
    providedIn: 'root'
})
export class EmailDataService {
    get path() {
        return this.backend.backendURL.getValue() + 'email/';
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(private readonly backend: BackendResolver, private readonly http: HttpClient) { }

    isConnected() {
        return this.http.get(this.path + 'isConnected');

    }

    connect(credentials: EMailCredentials) {
        return this.http.post(this.path + 'connect', credentials, this.httpOptions);
    }

    getMails() {
        return this.http.get<MessageDTO[]>(this.path + 'getMails/20');
    }

    disconnect() {
        return this.http.post(this.path + 'disconnect', this.httpOptions);
    }
}
