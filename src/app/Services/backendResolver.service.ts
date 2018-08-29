import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/*
    Service for providing and receiving data from the REST interface that is used for general functions of the application.
*/
@Injectable({
    providedIn: 'root'
})
export class BackendResolver {

    backendPath: string;
    backendSoundEnabled = true;

    constructor(private readonly http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        console.error(error);
        return throwError('Something bad happened; please try again later.');
    }

    setBackendPath(path: string) {
        this.backendPath = path;
    }

    /*
     * Check current sound output state
     */
    checkBackendSoundState(): boolean {
        return this.backendSoundEnabled;
    }

    /*
     * Mute the sound output of the backend
     */
    mute() {
        this.backendSoundEnabled = false;
        return this.http.post(this.backendPath + 'home/mute', null).pipe(
            catchError(this.handleError));
    }

    /*
     * Unmute the sound output of the backend
     */
    unmute() {
        this.backendSoundEnabled = true;
        return this.http.post(this.backendPath + 'home/unmute', null).pipe(
            catchError(this.handleError));
    }
}
