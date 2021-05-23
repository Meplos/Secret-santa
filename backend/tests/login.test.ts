import { describe, it } from 'mocha';
import { expect } from "chai";
import dbhandler from "./handler/dbhandler";
import AuthController from '../src/controller/AuthController'
import UserRepository from '../src/repository/UserRepository'
import ip from 'ip'
import jwt from 'jwt-simple'
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';

describe('authentication', function () {
    const firstname = 'test';
    const birthdate = moment().format('YYYY-MM-DD');
    const email = "test.test@test.fr";
    const password = "$test1234";
    const authController = new AuthController(new UserRepository());

    before((done) => { dbhandler.connect().then(() => done()) })
    after(() => {
        dbhandler.clearDatabase().then(() => {
            dbhandler.closeDatabase();
        });
    })

    it('createAccount', async () => {
        const { status, message } = await authController.signup({ email, password, firstname, birthdate }, ip.address());
        expect(status === StatusCodes.CREATED, 'Account created')
        const jwtEmail = jwt.decode(message, "SecretSanta")
        expect(jwtEmail === email, 'jwt valid')
    });

    it('login', async () => {
        const { status, message } = await authController.login({ email, password });
        expect(status === StatusCodes.OK, 'Login');
        const jwtEmail = jwt.decode(message, "SecretSanta");
        expect(jwtEmail === email, 'jwt check')
    });

    it('bad login', async () => {
        const { error, status } = await authController.login({ email: 'fail@test.fr', password });
        expect(error, 'Error message');
        expect(status === StatusCodes.BAD_REQUEST);
    });
});