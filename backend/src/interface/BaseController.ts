import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import Repository from './Repository';

export default class BaseController<T extends Repository> {

    protected repo: T;
    constructor(repo: T) {
        this.repo = repo;
    }

}