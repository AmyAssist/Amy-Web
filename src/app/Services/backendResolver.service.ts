import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 *    Service for providing and receiving data from the REST interface that is used for general functions of the application.
 */
@Injectable({
    providedIn: 'root'
})
export class BackendResolver {

    private readonly backendPath = new BehaviorSubject<string>(null);

    /**
     * The backend URL to use to connect to the Backend server.
     * The value can be null if currently no backend URL is provided.
     * You can subscibe to changes of this value.
     * @returns a BehaviorSubject representing the backend URL over time
     */
    get backendURL(): BehaviorSubject<string> {
        return this.backendPath;
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
}
