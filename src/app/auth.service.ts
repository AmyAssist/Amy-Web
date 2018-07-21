import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { BackendResolver } from '../app/Services/backendResolver.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = false;
  readonly cookie_key: string;

  constructor(private myRoute: Router, private cookieService: CookieService,
  private backend: BackendResolver) {
      this.cookie_key = backend.COOKIE_KEY;
   }

  loggedIn(): boolean {
    console.log("test" + this.cookieService.get(this.cookie_key) != null);
    this.isLoggedIn = this.cookieService.get(this.cookie_key) != null;
    return this.isLoggedIn
  }

  login(domain: string) {
    this.cookieService.put(this.cookie_key, domain);
    this.backend.setBackendPath(domain);
    this.isLoggedIn = true;
    this.myRoute.navigate(["home"]);
  }

  logout() {
    this.cookieService.remove(this.cookie_key);
    this.isLoggedIn = false;
    this.myRoute.navigate(["login"]);
  }

}