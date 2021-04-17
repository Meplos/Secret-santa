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
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const mongoose_1 = require("mongoose");
const AuthController_1 = __importDefault(require("./controller/AuthController"));
const UserRepository_1 = __importDefault(require("./repository/UserRepository"));
const PORT = 3000 || process.env.PORT;
const authController = new AuthController_1.default(new UserRepository_1.default());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.connect("mongodb://mongodb:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
    const repo = new UserRepository_1.default();
    // repo.createUser("akqjdsmfl", "kjdqmsldf", "sdjkflqsd", `${ip.address()}`, new Date(), new Date());
    const app = express_1.default();
    console.log("Hello world");
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Hello world 🖖" });
    });
    app.post("/signup", (req, res) => {
        const payload = req.body;
        const userIp = req.headers['x-forwarded-for'][0];
        authController.signup(payload, userIp);
    });
    app.post("/login", (req, res) => {
        const payload = req.body;
        authController.login(payload);
    });
    app.listen(PORT, () => {
        console.log('🖥️  Server listening... ');
        console.log(`\t 🏠 : http://localhost:${PORT}`);
        console.log(`\t 🌍 : http://${ip_1.default.address()}:${PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map