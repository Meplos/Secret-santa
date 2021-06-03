import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export default class Response {

    public status: number;
    public error: string;
    public body: any;

    constructor(status: number, body: any = null, error: string = null) {
        this.status = status;
        this.body = body;
        this.error = error;
    }

    public getStatus(): Number {
        return this.status;
    }

    public isError(): boolean {
        return this.error ? true : false;
    }

    public getBody() {
        return this.body;
    }

    public getErrorMessage(): string {
        return this.error;
    }



}