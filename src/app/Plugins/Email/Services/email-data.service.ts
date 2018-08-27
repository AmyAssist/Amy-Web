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

    getMails() {
        return this.http.get<MessageDTO[]>(this.path + 'getMails', this.httpOptions);
    }
}
