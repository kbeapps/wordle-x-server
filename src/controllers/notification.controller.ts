import Notification from '../models/notification.model';

const getAll = async (userId: string) => {
    try {
        return await Notification.find({ userId: userId });
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const create = async (userId: string, message: string) => {
    const notification = new Notification({
        userId: userId,
        message: message
    });

    try {
        return await notification.save();
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const remove = async (_id: string) => {
    try {
        return await Notification.findByIdAndRemove(_id);
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const removeAll = async (userId: string) => {
    try {
        return await Notification.deleteMany({ userId: userId });
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

export default {
    getAll, create, remove, removeAll
};