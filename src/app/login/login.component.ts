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
  inputText = '';

  constructor(
    private myRoute: Router,
    private auth: AuthService) {
  }

  ngOnInit() {
    console.log(this.auth.loggedIn());
    if(this.auth.loggedIn()){
      this.myRoute.navigate(["home"]);
    }
  }

  login() {
    if (this.inputText != '') {
      console.log("login");
      this.auth.login(this.inputText);
      this.myRoute.navigate(["home"]);
    }
  }

}
