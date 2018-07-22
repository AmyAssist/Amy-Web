import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendResolver } from '../app/Services/backendResolver.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = false;
  readonly cookie_key: string;

  constructor(private myRoute: Router, private backend: BackendResolver) {
      this.cookie_key = backend.COOKIE_KEY;
   }

  loggedIn(): boolean {
    console.log("test" + localStorage.getItem(this.cookie_key) != null);
    this.isLoggedIn = localStorage.getItem(this.cookie_key) != null;
    return this.isLoggedIn
  }

  login(domain: string) {
    this.backend.setBackendPath(domain);
    this.isLoggedIn = true;
    this.myRoute.navigate(["home"]);
    localStorage.setItem(this.cookie_key, domain);
  }

  logout() {
    this.isLoggedIn = false;
    this.myRoute.navigate(["login"]);
    localStorage.removeItem(this.cookie_key);
  }

}