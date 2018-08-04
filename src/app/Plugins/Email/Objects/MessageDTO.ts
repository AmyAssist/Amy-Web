export class MessageDTO {
    from: string;
    subject: string;
    content: string;
    sentDate: string; // cut seconds and get rid of T
    important: boolean;

    constructor() {

    }
}