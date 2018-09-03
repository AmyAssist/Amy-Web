import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 *    Service for providing and receiving data from the REST interface that is used for general functions of the application.
 */
@Injectable({
    providedIn: 'root'
})
export class BackendResolver {

    private readonly backendPath = new BehaviorSubject<string>(null);
    backendSoundEnabled = true;

    constructor(private readonly http: HttpClient) { }
    /**
     * The backend URL to use to connect to the Backend server.
     * The value can be null if currently no backend URL is provided.
     * You can subscibe to changes of this value.
     * @returns a BehaviorSubject representing the backend URL over time
     */
    get backendURL() {
        return this.backendPath;
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    setBackendPath(path: string) {
        if (path == null) {
            this.backendPath.next(null);
        } else {
            const urlObject = new URL(path);
            let url = urlObject.href;
            url += url.endsWith('/') ? '' : '/';
            this.backendPath.next(url);
        }
    }

    private isValidBackendURL(backendUrl: string): boolean {
        return true;
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
        return this.http.post(this.backendPath.getValue() + 'home/mute', null).pipe(
            catchError(this.handleError));
    }

    /*
     * Unmute the sound output of the backend
     */
    unmute() {
        this.backendSoundEnabled = true;
        return this.http.post(this.backendPath.getValue() + 'home/unmute', null).pipe(
            catchError(this.handleError));
    }
}
