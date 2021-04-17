import User, { IUser } from '../entity/User'


export default class UserRepository {

    public async createUser(email: string, firstname: string, password: string, lastip: string, birthdate: Date, lastConnexion: Date) {
        let user: IUser;
        user = await User.create({ email, firstname, password, lastip, birthdate, lastConnexion });
        console.log(user);
        return user;
    }

    public async findOneBy(params: any)
    {
        return await User.findOne(params);
    }

}