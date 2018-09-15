export class Response {

    text: string;
    link: string;
    attachment: Object;

    constructor(text: string, link: string, attachment: Object) {
        this.text = text;
        this.link = link;
        this.attachment = attachment;
    }
}
