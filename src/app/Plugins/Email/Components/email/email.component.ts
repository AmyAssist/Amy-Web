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

  amount: number;

  messages: MessageDTO[];

  constructor(private readonly emailService: EmailDataService) { }

  ngOnInit() {
    this.emailService.setupPath();
    this.refresh();
  }

  getAllMails() {
    this.emailService.getMails().subscribe((data: MessageDTO[]) => {
      if (data) {
        this.newMessages = true;
        this.amount = data.length;
        this.messages = data;
      } else {
        this.newMessages = false;
        this.amount = 0;
        this.messages = null;
      }
    });
  }

  refresh() {
    this.getAllMails();
  }
}
