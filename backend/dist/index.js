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
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const AuthController_1 = __importDefault(require("./controller/AuthController"));
const UserRepository_1 = __importDefault(require("./repository/UserRepository"));
const PORT = 3000 || process.env.PORT;
const userRepo = new UserRepository_1.default();
const authController = new AuthController_1.default(userRepo);
const SECRET = "SecretSanta";
passport_1.default.use(new passport_http_bearer_1.Strategy((token, done) => {
    const decoded = jwt_simple_1.default.decode(token, SECRET, false, "HS256");
    if (moment_1.default().unix() > moment_1.default(decoded.exp).unix()) {
        return done(null, false);
    }
    userRepo.findOneBy({ _id: decoded._id }).then(user => {
        if (!user)
            return done(null, false);
        return done(null, user);
    }).catch(err => done(null, false));
}));
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.connect("mongodb://mongodb:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
    const repo = new UserRepository_1.default();
    // repo.createUser("akqjdsmfl", "kjdqmsldf", "sdjkflqsd", `${ip.address()}`, new Date(), new Date());
    console.log("Hello world");
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Hello world 🖖" });
    });
    app.post("/signup", (req, res) => {
        const payload = req.body;
        const userIp = "127.0.0.1";
        authController.signup(payload, userIp).then(({ status, message }) => {
            res.status(status).send({ message });
        });
    });
    app.post("/login", (req, res) => {
        const payload = req.body;
        authController.login(payload).then(({ status, message }) => {
            res.status(status).send({ message });
        });
    });
    app.get("/secure", passport_1.default.authenticate('bearer', { session: false }), (req, res) => {
        res.sendStatus(200);
    });
    app.listen(PORT, () => {
        console.log('🖥️  Server listening... ');
        console.log(`\t 🏠 : http://localhost:${PORT}`);
        console.log(`\t 🌍 : http://${ip_1.default.address()}:${PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map