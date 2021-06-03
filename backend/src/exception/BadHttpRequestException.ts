import { StatusCodes } from "http-status-codes";
import BaseResponse from "../interface/BaseResponse";

export default class BadHttpRequestException extends BaseResponse {

    constructor(error: string) {
        super(StatusCodes.BAD_REQUEST, error);
    }

}