import { Component, OnInit } from '@angular/core';
import { EmailDataService } from '../../Services/email-data.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  unreadMessages = -1;

  output: String;

  constructor(private emailService: EmailDataService) { }

  ngOnInit() {
  }

  hasNewMessages() {
    var newMessages: Boolean;
    this.emailService.hasUnreadMessages().subscribe((data: Boolean) => newMessages = data);
    if (newMessages) {
      this.output = 'You have new messages';
    } else {
      this.output = 'You do not have new messages';
    }
  }

  amountNewMessages() {
    this.emailService.amountNewMessages().subscribe((data: number) => this.unreadMessages = data);
    this.output = 'You have ' + this.unreadMessages + ' new messages';
  }

  getImportantMails() {
    this.emailService.getImportantMails().subscribe();
    this.output = '';
  }

  getAllMails() {
    this.emailService.getImportantMails().subscribe();
  }
}