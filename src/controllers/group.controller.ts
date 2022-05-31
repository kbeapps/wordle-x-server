import Group from '../models/group.model';

const get = async (query: object) => {
    try {
        return await Group.findOne(query);
    } catch (err) {
        console.log(err);
    };
};

const getAll = async (userId: string) => {
    try {
        return await Group.find({ members: userId });
    } catch (err) {
        console.log(err);
    };
};

const create = async (ownerId: string, groupName: string, members: string[]) => {
    const group = new Group({
        ownerId: ownerId,
        groupName: groupName,
        members: members
    });

    try {
        return await group.save();
    } catch (err) {
        console.log(err);
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await Group.findByIdAndUpdate(
            _id, query, { new: true }
        );
    } catch (err) {
        console.log(err);
    }
};

const remove = async (_id: string) => {
    try {
        return await Group.findByIdAndRemove(_id);
    } catch (err) {
        console.log(err);
    }
};

export default {
    get, getAll, create, update, remove
};