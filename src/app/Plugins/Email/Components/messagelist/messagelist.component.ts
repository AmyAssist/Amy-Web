import { Component, OnInit } from '@angular/core';
import { EmailDataService } from '../../Services/email-data.service';
import { MessageDTO } from '../../Objects/MessageDTO';

@Component({
    selector: 'app-email-messagelist',
    templateUrl: './messagelist.component.html',
    styleUrls: ['./messagelist.component.css']
})
export class MessageListComponent implements OnInit {

    fetchingMails: boolean;
    fetchingError: boolean;

    messages: MessageDTO[];

    showAll = true;

    constructor(private readonly emailService: EmailDataService) { }

    ngOnInit() {
        this.refresh();
    }

    getAllMails() {
        this.fetchingMails = true;
        this.emailService.getMails().subscribe((data: MessageDTO[]) => {
            if (data) {
                this.messages = [...data];
                this.fetchingError = false;
                this.fetchingMails = false;
            }
        }, error => {
            console.log(error);
            this.fetchingError = true;
            this.fetchingMails = false;
        });
    }

    refresh() {
        this.getAllMails();
    }

    tabChanged(event) {
        this.showAll = event.index === 0;
    }

    getSentDate(message: MessageDTO): string {
        const sentDate = message.sentDate;
        const splitIndex = sentDate.indexOf('T');
        return sentDate.substring(0, splitIndex);
    }

    getSentTime(message: MessageDTO): string {
        const sentDate = message.sentDate;
        const splitIndex = sentDate.indexOf('T');
        return sentDate.substring(splitIndex + 1, splitIndex + 6);
    }
}
