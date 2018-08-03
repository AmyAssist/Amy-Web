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
    this.emailService.getMails().subscribe((data: MessageDTO[]) => {
      if (data) {
        this.newMessages = true;
        this.fetchingError = false;
        this.amount = data.length;
        // this.messages = data;
        this.messages = data;
        this.countImportantMails();
      } else {
        // TODO: handle errors and null return values
        this.fetchingError = true;
      }
    });
  }

  countImportantMails() {
    if (this.messages) {
      let counter = 0;
      this.importantMessages = [];
      for (let m of this.messages) {
        if (m.important) {
          this.importantMessages.push(m);
          counter++;
        }
      }
      this.amountImportant = counter;
    }
  }

  refresh() {
    this.getAllMails();
  }
}
