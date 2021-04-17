import UserRepository from "../repository/UserRepository";

export default class AuthController {
    private repos: UserRepository;
    public constructor(repos: UserRepository) {
        this.repos = repos;
    }


    public async login(payload: any) {
        const login = payload.login;
        const passwd = payload.passwd;

    }

    public async signup(payload: any, userIp: string) {
        let status = 500;
        const message = {};
        const firstname = payload.firstname;
        const email = payload.email;
        const birthdate = new Date(payload.birthdate);
        const passwd = payload.passwd;

        const ip = userIp;
        const lastConnexion = new Date();
        // TODO: Hash the passwd see with Bearer and passport

        const user = await this.repos.createUser(email, firstname, passwd, ip, birthdate, lastConnexion);
        if (user) {
            status = 200;
            // TODO: génerate token
        }

        return { status, message }
    }
}