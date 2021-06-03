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

    public async updateUserConnectionInfo(user: IUser, ip: string) {
        const lastConnexion = moment().format('YYYY-MM-DD');
        User.updateOne({ _id: user._id }, { latestip: ip, lastConnexion })
    }

    public async findBy(params: any) {
        return await User.find(params);
    }

}