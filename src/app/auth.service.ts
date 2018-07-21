import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = false;
  readonly COOKIE_KEY = "core-domain";

  constructor(private myRoute: Router, private cookieService: CookieService) { }

  loggedIn(): boolean {
    console.log("test" + this.cookieService.get(this.COOKIE_KEY) != null);
    this.isLoggedIn = this.cookieService.get(this.COOKIE_KEY) != null;
    return this.isLoggedIn
  }

  login(domain: string) {
    this.cookieService.put(this.COOKIE_KEY, domain);
    this.isLoggedIn = true;
    this.myRoute.navigate(["home"]);
  }

  logout() {
    this.cookieService.remove(this.COOKIE_KEY);
    this.isLoggedIn = false;
    this.myRoute.navigate(["login"]);
  }

}