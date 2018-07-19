import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  loggedIn = false;

  constructor() { }

  ngOnInit() {
  }

  logIn(mailAddress: string, mailPassword: string) {
    // TODO: implement
    this.loggedIn = true;
  }

  logOut() {
    // TODO: implement
    this.loggedIn = false;
  }
}