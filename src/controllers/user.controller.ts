import User, { IUser } from '../models/user.model';

const create = async (email: string, password: string, username: string): Promise<IUser> => {
    const user: IUser = new User({
        email: email,
        password: password,
        username: username
    });

    try {
        return await user.save() as IUser;
    } catch (err) {
        throw new Error(String(err));
    };
};

const get = async (query: object) => {
    try {
        return await User.findOne(query) as IUser;
    } catch (err) {
        throw new Error(String(err));
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await User.findByIdAndUpdate(
            _id, query, { new: true }
        ) as IUser;
    } catch (err) {
        throw new Error(String(err));
    };
};

const remove = async (_id: string) => {
    try {
        return await User.findByIdAndRemove(_id);
    } catch (err) {
        throw new Error(String(err));
    };
};

export default {
    create, get, update, remove
};