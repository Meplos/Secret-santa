import moment from 'moment';
import User, { IUser } from '../entity/User'
import Repository from '../interface/Repository'

export default class UserRepository implements Repository {

    public async createUser(
        email: string,
        firstname: string,
        password: string,
        lastip: string,
        birthdate: string,
        lastConnexion: string) {
        let user: IUser;
        user = await User.create({ email, firstname, password, lastip, birthdate, lastConnexion });
        console.log(user);
        return user;
    }

    public async findOneBy(params: any) {
        return await User.findOne(params);
    }

    public async updateUserConnectionInfo(email: string, ip: string) {
        const user = await User.findOne({ email });
        user.lastip = ip;
        user.lastConnexion = moment().format('YYYY-MM-DD')
    }

    public async findBy(params: any) {
        return await User.find(params);
    }

}