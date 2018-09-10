
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BackendResolver } from '../../../Services/backendResolver.service';

@Injectable({
    providedIn: 'root'
})
export class BackendSoundService {

    constructor(private readonly http: HttpClient, private readonly backend: BackendResolver) { }

    backendSoundEnabled = true;

    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    /*
     * Get the path for the backend
     */
    get path() {
        return this.backend.backendURL.getValue();
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
        return this.http.post(this.path + 'home/mute', null).pipe(
            catchError(this.handleError));
    }

    /*
     * Unmute the sound output of the backend
     */
    unmute() {
        this.backendSoundEnabled = true;
        return this.http.post(this.path + 'home/unmute', null).pipe(
            catchError(this.handleError));
    }
}
