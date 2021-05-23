import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    password: { type: String, required: true },
    lastip: { type: String, required: true },
    birthdate: { type: String, require: true },
    lastConnexion: { type: String, require: true },
});

export interface BaseUser {
    email: string,
    firstname: string,
    password: string,
    lastip?: string,
    birthdate: string,
    lastConnexion?: string,
}

export interface IUser extends BaseUser, Document {


}

export default mongoose.model<IUser>("User", UserSchema);