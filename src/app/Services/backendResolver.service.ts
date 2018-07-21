import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

/*
    Service for providing and receiving data from the REST interface that is used for general functions of the application.
*/
@Injectable({
    providedIn: 'root'
})
export class BackendResolver { 

    backendPath: string;
    readonly COOKIE_KEY = "core-domain";

    constructor(private cookieService: CookieService) {
        this.backendPath = cookieService.get("core-domain");
    }

    setBackendPath(path: string){
        this.backendPath = path;
    }
}