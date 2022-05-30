import Notification from '../models/notification.model';

const getAll = async (userId: string) => {
    try {
        return await Notification.find({ userId: userId });
    } catch (error) {
        console.log(error);
    };
};

const create = async (userId: string, message: string) => {
    const notification = new Notification({
        userId: userId,
        message: message
    });

    try {
        return await notification.save();
    } catch (error) {
        console.log(error);
    };
};

const remove = async (_id: string) => {
    try {
        return await Notification.findByIdAndRemove(_id);
    } catch (error) {
        console.log(error);
    };
};

const removeAll = async (userId: string) => {
    try {
        return await Notification.deleteMany({ userId: userId });
    } catch (error) {
        console.log(error);
    };
};

export default {
    getAll, create, remove, removeAll
};