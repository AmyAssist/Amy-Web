import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BackendResolver } from '../../../Services/backendResolver.service';
import { MessageDTO } from '../../Email/Objects/MessageDTO';
import { EMailCredentials } from '../../Email/Objects/EMailCredentials';

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

    connect(credentials: EMailCredentials) {
        return this.http.post(this.path + 'connect', credentials, this.httpOptions);
    }

    getCredentials() {
        return this.http.get(this.path + 'getCredentials');
    }

    getMails() {
        return this.http.get<MessageDTO[]>(this.path + 'getMails/20');
    }

    disconnect() {
        return this.http.post(this.path + 'disconnect', this.httpOptions);
    }
}
