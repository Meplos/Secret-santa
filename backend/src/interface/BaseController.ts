import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import Repository from './Repository';

export default class BaseController {

    protected repo: Repository;
    constructor(repo: Repository) {
        this.repo = repo;
    }
}