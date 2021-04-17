"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlreadyExistException extends Error {
    constructor(msg) {
        super(msg);
        console.error(msg);
    }
}
exports.default = AlreadyExistException;
//# sourceMappingURL=AlreadyExistException.js.map