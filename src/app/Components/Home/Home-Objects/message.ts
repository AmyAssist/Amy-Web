import {Response} from './response';

export class Message {

    from: string;
    response: Response;

    constructor(from: string, response: Response) {
        this.from = from;
        this.response = response;
    }
}
