import Group, { IGroup } from '../models/group.model';

const create = async (ownerId: string, groupName: string, members: string[]): Promise<IGroup> => {
  const group: IGroup = new Group({
    ownerId: ownerId,
    groupName: groupName,
    members: members,
  });

  try {
    return (await group.save()) as IGroup;
  } catch (err) {
    throw new Error(String(err));
  }
};

const get = async (query: object): Promise<IGroup> => {
  try {
    return (await Group.findOne(query)) as IGroup;
  } catch (err) {
    throw new Error(String(err));
  }
};

const getAll = async (ownerId: string): Promise<IGroup[]> => {
  try {
    return (await Group.find({ ownerId: ownerId })) as IGroup[];
  } catch (err) {
    throw new Error(String(err));
  }
};

const update = async (_id: string, query: object): Promise<IGroup> => {
  try {
    return (await Group.findByIdAndUpdate(_id, query, { new: true })) as IGroup;
  } catch (err) {
    throw new Error(String(err));
  }
};

const remove = async (_id: string): Promise<IGroup> => {
  try {
    return (await Group.findByIdAndRemove(_id)) as IGroup;
  } catch (err) {
    throw new Error(String(err));
  }
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
