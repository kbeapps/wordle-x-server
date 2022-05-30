import User from '../models/user.model';

const get = async (query: object) => {
    try {
        return await User.findOne(query);
    } catch (error) {
        console.log(error);
    };
};

const create = async (email: string, password: string, username: string) => {
    const user = new User({
        email: email,
        password: password,
        username: username
    });

    try {
        const res = await user.save();
        return res;
    } catch (error) {
        console.log(error);
        return error;
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await User.findByIdAndUpdate(
            _id, query, { new: true }
        );
    } catch (error) {
        console.log(error);
    };
};

const remove = async (_id: string) => {
    try {
        return await User.findByIdAndRemove(_id);
    } catch (error) {
        console.log(error);
    };
};

export default {
    create, get, update, remove
};