import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendResolver } from './backendResolver.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly cookieKey = 'core-domain';

  constructor(private readonly myRoute: Router, private readonly backend: BackendResolver) {
    if (this.loggedIn()) {
      backend.setBackendPath(localStorage.getItem(this.cookieKey));
    }
  }

  loggedIn(): boolean {
    return localStorage.getItem(this.cookieKey) != null;
  }

  login(domain: string) {
    const backendURL = this.preprocessBackendURL(domain);
    this.backend.setBackendPath(backendURL);
    this.myRoute.navigate(['home']);
    localStorage.setItem(this.cookieKey, this.backend.backendURL.getValue());
  }

  private preprocessBackendURL(backendURL: string): string {
    const url = new URL(backendURL);
    return url.origin + url.pathname;
  }

  logout() {
    this.myRoute.navigate(['login']);
    localStorage.removeItem(this.cookieKey);
  }

}
