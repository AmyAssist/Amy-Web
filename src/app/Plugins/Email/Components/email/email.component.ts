import { Component, OnInit } from '@angular/core';
import { EmailDataService } from '../../Services/email-data.service';
import { MessageDTO } from '../../Objects/MessageDTO';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  newMessages: boolean;
  showAll: boolean;
  fetchingMails: boolean;
  fetchingError: boolean;

  amount: number;
  amountImportant;

  messages: MessageDTO[];
  importantMessages: MessageDTO[];

  constructor(private readonly emailService: EmailDataService) { }

  ngOnInit() {
    this.emailService.setupPath();
    this.showAll = true;
    this.refresh();
  }

  getAllMails() {
    this.fetchingMails = true;
    this.emailService.getMails().subscribe((data: MessageDTO[]) => {
      if (data) {
        this.newMessages = true;
        this.fetchingError = false;
        this.amount = data.length;
        this.messages = [...data];
        this.importantMessages = data.filter(message => message.important);
        this.amountImportant = this.importantMessages.length;
      } else {
        // TODO: handle errors and null return values
        this.fetchingError = true;
      }
      // is not executed in case of request failure
      this.fetchingMails = false;
    });
  }

  refresh() {
    this.getAllMails();
  }
}
