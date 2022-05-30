import Group from '../models/group.model';

const get = async (query: object) => {
    try {
        return await Group.findOne(query);
    } catch (error) {
        console.log(error);
    };
};

const getAll = async (userId: string) => {
    try {
        return await Group.find({ members: userId });
    } catch (error) {
        console.log(error);
    };
};

const create = async (groupName: string, members: string[]) => {
    const group = new Group({
        groupName: groupName,
        members: members
    });

    try {
        return await group.save();
    } catch (error) {
        console.log(error);
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await Group.findByIdAndUpdate(
            _id, query, { new: true }
        );
    } catch (error) {
        console.log(error);
    }
};

const remove = async (_id: string) => {
    try {
        return await Group.findByIdAndRemove(_id);
    } catch (error) {
        console.log(error);
    }
};

export default {
    get, getAll, create, update, remove
};