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
    this.emailService.getCredentials().subscribe((creds: EMailCredentials) => {
      if (creds) {
        this.credentialsExist = true;
        this.connect(creds.username, creds.password, creds.imapServer);
      }
    });
  }

  connect(username: string, password: string, imapServer: string) {
    let credentials: EMailCredentials;
    if (username === '' && password === '' && imapServer === '') {
      credentials = null;
    } else {
      credentials = new EMailCredentials(username, password, imapServer);
    }
    this.connecting = true;
    this.emailService.connect(credentials).subscribe((data: boolean) => {
      if (data === true) {
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
      this.credentialsExist = false;
    });
  }

}
