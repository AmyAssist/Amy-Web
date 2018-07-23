import { Component, OnInit } from '@angular/core';
import { EmailDataService } from '../../Services/email-data.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  unreadMessages: number;

  newMessages: boolean;

  output: string;

  constructor(private readonly emailService: EmailDataService) { }

  ngOnInit() {
    this.unreadMessages = -1;
    this.newMessages = false;
  }

  hasNewMessages() {
    this.emailService.hasUnreadMessages().subscribe((data: boolean) => this.newMessages = data);
    if (this.newMessages) {
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
    this.emailService.getImportantMails(-1).subscribe((data: string) => this.output = data);
  }

  getAllMails() {
    this.emailService.getAllMails(1).subscribe((data: string) => this.output = data);
  }
}