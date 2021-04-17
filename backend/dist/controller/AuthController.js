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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    constructor(repos) {
        this.repos = repos;
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = payload.email;
            const passwd = payload.passwd;
            const user = yield this.repos.findOneBy({ email });
            if (user) {
                const match = yield bcrypt_1.default.compare(passwd, user.password);
                if (match) {
                    const token = jwt_simple_1.default.encode({ _id: user._id, exp: moment_1.default().add(1, 'hour') }, "SecretSanta", "HS256");
                    return { status: 200, message: token };
                }
                else {
                    return { status: 401, error: "Unauthorized" };
                }
            }
            else {
                return { status: 403, error: "Invalid input" };
            }
        });
    }
    signup(payload, userIp) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = 500;
            let message = {};
            const firstname = payload.firstname;
            const email = payload.email;
            const birthdate = new Date(payload.birthdate);
            const passwd = payload.passwd;
            const ip = userIp;
            const lastConnexion = new Date();
            console.log(passwd);
            const hash = yield bcrypt_1.default.hash(passwd, 10);
            const user = yield this.repos.createUser(email, firstname, hash, ip, birthdate, lastConnexion);
            if (user) {
                status = 200;
                const token = jwt_simple_1.default.encode({ _id: user._id, exp: moment_1.default().add(1, 'hour') }, "SecretSanta", "HS256");
                message = token;
            }
            else {
                status = 401;
                message = "Unauthorized";
            }
            return { status, message };
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map