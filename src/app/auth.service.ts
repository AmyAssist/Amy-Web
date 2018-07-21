import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = false;

  constructor(private myRoute: Router) { }

  isLoggednIn() {

    return this.isLoggedIn = false;

  }

  login() {
      this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = true;
    this.myRoute.navigate(["login"]);

  }

}