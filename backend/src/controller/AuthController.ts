import UserRepository from "../repository/UserRepository";
import jwt from "jwt-simple"
import moment from "moment";
import bcrypt from "bcrypt";

export default class AuthController {
    private repos: UserRepository;
    public constructor(repos: UserRepository) {
        this.repos = repos;
    }


    public async login(payload: any) {
        const email = payload.email;

        const passwd = payload.passwd;
        const user = await this.repos.findOneBy({email});
        if(user) {
            const match = await bcrypt.compare(passwd, user.password)
            if (match) {
                const token = jwt.encode({ _id: user._id, exp: moment().add(1, 'hour') }, "SecretSanta", "HS256");
                return { status: 200, message: token };
            } else {
                return { status: 401, error: "Unauthorized" };
            }

        } else {
            return {status: 403, error: "Invalid input"};
        }


    }

    public async signup(payload: any, userIp: string) {
        let status = 500;
        let message = {};
        const firstname = payload.firstname;
        const email = payload.email;
        const birthdate = new Date(payload.birthdate);
        const passwd = payload.passwd;

        const ip = userIp;
        const lastConnexion = new Date();
        console.log(passwd);

        const hash = await bcrypt.hash(passwd, 10);

        const user = await this.repos.createUser(email, firstname, hash, ip, birthdate, lastConnexion);
        if (user) {
            status = 200;
            const token = jwt.encode({_id: user._id, exp: moment().add(1, 'hour')}, "SecretSanta", "HS256");
            message = token;
        } else {
            status = 401;
            message = "Unauthorized";
        }

        return { status, message }
    }
}