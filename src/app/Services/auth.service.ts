import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendResolver } from './backendResolver.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = false;
  readonly cookieKey = 'core-domain';


  constructor(private readonly myRoute: Router, private readonly backend: BackendResolver) {
    if (this.loggedIn()) {
      backend.setBackendPath(localStorage.getItem(this.cookieKey));
    }
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
