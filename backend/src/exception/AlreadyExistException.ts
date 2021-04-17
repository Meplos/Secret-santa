import { exception } from "node:console";

export default class AlreadyExistException extends Error {

    public constructor(msg: string) {
        super(msg);
        console.error(msg);
    }
}