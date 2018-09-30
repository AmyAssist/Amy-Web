export class Response {

    text: string;
    widget: string;
    attachment: Object;

    constructor(text: string, link: string, attachment: Object) {
        this.text = text;
        this.widget = link;
        this.attachment = attachment;
    }
}
