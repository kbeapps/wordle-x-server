import User from '../models/user.model';

const create = async (email: string, password: string, username: string) => {
    const user = new User({
        email: email,
        password: password,
        username: username
    });

    try {
        return await user.save();
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const get = async (query: object) => {
    try {
        return await User.findOne(query);
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await User.findByIdAndUpdate(
            _id, query, { new: true }
        );
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const remove = async (_id: string) => {
    try {
        return await User.findByIdAndRemove(_id);
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

export default {
    create, get, update, remove
};