import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendResolver } from '../app/Services/backendResolver.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = false;
  readonly cookieKey: string;

  constructor(private readonly myRoute: Router, private readonly backend: BackendResolver) {
    this.cookieKey = backend.cookieKey;
  }

  loggedIn(): boolean {
    this.isLoggedIn = localStorage.getItem(this.cookieKey) != null;
    return this.isLoggedIn;
  }

  login(domain: string) {
    this.backend.setBackendPath(domain);
    this.isLoggedIn = true;
    this.myRoute.navigate(['home']);
    localStorage.setItem(this.cookieKey, domain);
  }

  logout() {
    this.isLoggedIn = false;
    this.myRoute.navigate(['login']);
    localStorage.removeItem(this.cookieKey);
  }

}