import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
