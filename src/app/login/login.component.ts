import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url: string;

  constructor(
    private myRoute: Router,
    private auth: AuthService) {
  }

  ngOnInit() {
  }

  login () {
      console.log("login");
      this.auth.login();
      this.myRoute.navigate(["home"]);
  }

}
