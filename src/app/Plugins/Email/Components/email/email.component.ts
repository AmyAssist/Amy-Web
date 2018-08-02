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
    this.emailService.setupPath();
    this.unreadMessages = -1;
    this.newMessages = false;
  }

  getAllMails() {
    this.emailService.getMails(1, false).subscribe((data: string) => this.output = data);
  }
}
