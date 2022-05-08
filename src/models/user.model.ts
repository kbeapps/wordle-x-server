import { Schema, model } from 'mongoose';
import { BaseModel } from './base.model';
import { UserDoc } from '../interfaces/user.interface';

// interface IUser {
//     email: string;
//     username: string;
//     password: string;
//     avatar?: string;
//     games?: string[],
//     friends?: string[],
//     groups?: string[],
// };

const UserSchema = new Schema<UserDoc>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, minLength: 5, maxLength: 16 },
    password: { type: String, required: true, minLength: 5 },
    avatar: String,
    games: Array,
    friends: Array,
    groups: Array
}, { timestamps: true });

export class User extends BaseModel {
    constructor() {
        super(
            model<UserDoc>('User', UserSchema)
        );
    }
}