import { Component, OnInit } from '@angular/core';
import { EmailDataService } from '../../Services/email-data.service';
import { EMailCredentials } from '../../Objects/EMailCredentials';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  readonly usernameKey = 'mail_username';
  readonly passwordKey = 'mail_password';
  readonly serverKey = 'mail_server';

  credentialsExist = false;
  connecting = false;
  connected = false;
  connectionError = false;

  constructor(private readonly emailService: EmailDataService) { }

  ngOnInit() {
    const username = localStorage.getItem(this.usernameKey);
    const password = localStorage.getItem(this.passwordKey);
    const imapServer = localStorage.getItem(this.serverKey);
    if (username != null && password != null && imapServer != null) {
      this.credentialsExist = true;
      this.connect(username, password, imapServer);
    }
  }

  connect(username: string, password: string, imapServer: string) {
    const credentials = new EMailCredentials(username, password, imapServer);
    this.connecting = true;
    this.emailService.connect(credentials).subscribe((data: boolean) => {
      if (data === true) {
        localStorage.setItem(this.usernameKey, username);
        localStorage.setItem(this.passwordKey, password);
        localStorage.setItem(this.serverKey, imapServer);
        this.credentialsExist = true;
        this.connectionError = false;
        this.connected = true;
      } else {
        this.connected = false;
        this.connectionError = true;
      }
      this.connecting = false;
    }, error => {
      console.log(error);
      this.connected = false;
      this.connectionError = true;
      this.connecting = false;
    });
  }

  disconnect() {
    this.emailService.disconnect().subscribe(() => {
      this.connected = false;
      localStorage.removeItem(this.usernameKey);
      localStorage.removeItem(this.passwordKey);
      localStorage.removeItem(this.serverKey);
      this.credentialsExist = false;
    });
  }

}
