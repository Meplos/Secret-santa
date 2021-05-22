import { describe, it } from 'mocha';
import { expect } from "chai";
import dbhandler from "./handler/dbhandler";
import AuthController from '../src/controller/AuthController'
import UserRepository from '../src/repository/UserRepository'
import ip from 'ip'
import jwt from 'jwt-simple'
import moment from 'moment';

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

    it('createAccount', function () {
        authController.signup({ email, password, firstname, birthdate }, ip.address()).then(
            (res) => {
                expect(res.status === 200, 'Account created')
                const jwtEmail = jwt.decode(res.message, "SecretSanta")
                expect(jwtEmail === email, 'jwt valid')
            })
    });
});