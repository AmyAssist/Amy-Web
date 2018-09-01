import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlFormControl = new FormControl('', [
    Validators.required,
    (control) => {
      try {
        const t = new URL(control.value);
      } catch (e) {
        return { url: 'error' };
      }
      return null;
    }
  ]);

  url: string;
  inputText = '';

  constructor(
    private readonly myRoute: Router,
    private readonly auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.myRoute.navigate(['home']);
    }
  }

  login() {
    if (this.inputText !== '') {
      this.auth.login(this.inputText);
      this.myRoute.navigate(['home']);
    }
  }

}
