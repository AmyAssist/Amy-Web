import { Injectable, ErrorHandler, Component, OnInit } from '@angular/core';

/*
    Service for providing and receiving data from the REST interface that is used for general functions of the application.
*/
@Injectable({
    providedIn: 'root'
})
export class BackendResolver { 

    backendPath: string;
    readonly COOKIE_KEY = "core-domain";

    constructor() {
        this.backendPath = localStorage.getItem(this.COOKIE_KEY);
    }

    setBackendPath(path: string){
        this.backendPath = path;
    }
}