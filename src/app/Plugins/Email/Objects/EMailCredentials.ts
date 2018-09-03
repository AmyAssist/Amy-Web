export class EMailCredentials {
    username: string;
    password: string;
    imapServer: string;

    constructor(username: string, password: string, imapServer: string) {
        this.username = username;
        this.password = password;
        this.imapServer = imapServer;
    }
}
