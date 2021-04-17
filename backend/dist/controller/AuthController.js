"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(repos) {
        this.repos = repos;
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = payload.login;
            const passwd = payload.passwd;
        });
    }
    signup(payload, userIp) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = 500;
            const message = {};
            const firstname = payload.firstname;
            const email = payload.email;
            const birthdate = new Date(payload.birthdate);
            const passwd = payload.passwd;
            const ip = userIp;
            const lastConnexion = new Date();
            // TODO: Hash the passwd see with Bearer and passport
            const user = yield this.repos.createUser(email, firstname, passwd, ip, birthdate, lastConnexion);
            if (user) {
                status = 200;
                // TODO: génerate token
            }
            return { status, message };
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map