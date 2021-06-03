import UserRepository from "../repository/UserRepository";
import jwt from "jwt-simple"
import moment from "moment";
import bcrypt from "bcrypt";
import { BaseUser } from "../entity/User"
import BaseController from "../interface/BaseController";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export default class AuthController extends BaseController<UserRepository> {

    public constructor(repo: UserRepository) {
        super(repo);
    }

    /**
     *
     * @param email
     * @param password
     * @returns
     */

    public async login({ email, password, lastip }: BaseUser) {

        const user = await this.repo.findOneBy({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                this.repo.updateUserConnectionInfo(user, lastip);
                const token = jwt.encode({ _id: user._id, email: user.email, latestip: user.lastip, lastConnexion: user.lastConnexion, exp: moment().add(1, 'hour') }, "SecretSanta", "HS256");
                return { status: StatusCodes.OK, message: token };
            } else {
                return { status: StatusCodes.BAD_REQUEST, error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
            }

        } else {
            return {
                status: StatusCodes.BAD_REQUEST,
                error: getReasonPhrase(StatusCodes.BAD_REQUEST)
            };
        }


    }

    /**
     * Create an account in database
     * @param firstname
     * @param email
     * @param birthdate
     * @param password
     * @param userIp
     * @returns
     */
    public async signup({ firstname, email, birthdate, password, lastip }: BaseUser, ) {
        let status = StatusCodes.INTERNAL_SERVER_ERROR;
        let message = '';
        const ip = lastip;
        const lastConnexion = moment().format("YYYY-MM-DD");
        console.log(password);

        const hash = await bcrypt.hash(password, 10);
        const user = await this.repo.createUser(email, firstname, hash, ip, birthdate, lastConnexion);
        if (user) {
            status = StatusCodes.CREATED;
            const token = jwt.encode({ _id: user._id, email: user.email, latestip: user.lastip, lastConnexion: user.lastConnexion, exp: moment().add(1, 'hour') }, "SecretSanta", "HS256");
            message = token;
        } else {
            status = StatusCodes.BAD_REQUEST;
            message = getReasonPhrase(StatusCodes.BAD_REQUEST);
        }

        return { status, message }
    }
}