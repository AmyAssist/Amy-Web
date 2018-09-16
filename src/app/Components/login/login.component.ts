import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { WebAppServerInfoService } from '../../Services/webAppServerInfo.service';
import { WebAppServerInfo } from '../../Objects/WebAppServerInfo';

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

  constructor(
    private readonly myRoute: Router,
    private readonly auth: AuthService,
    private readonly webAppServerInfoService: WebAppServerInfoService) {
  }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.myRoute.navigate(['home']);
    } else {
      this.webAppServerInfoService.getWebAppServerInfo().subscribe((data) => {
        if(this.urlFormControl.value == '' && data.defaultBackendUrl !== '') {
          this.urlFormControl.setValue(data.defaultBackendUrl);
        }
      });
    }
  }

  login() {
    let inputText = this.urlFormControl.value;
    if (inputText !== '') {
      this.auth.login(inputText);
      this.myRoute.navigate(['home']);
    }
  }

}
