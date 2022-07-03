import User, { IUser } from '../models/user.model';

const create = async (user: IUser): Promise<IUser> => {
	try {
		console.log(user);
		return (await user.save()) as IUser;
	} catch (err) {
		throw new Error(String(err));
	}
};

const getById = async (userId: string): Promise<IUser> => {
	try {
		return (await User.findById(userId)) as IUser;
	} catch (err) {
		throw new Error(String(err));
	}
};

const get = async (query: object): Promise<IUser> => {
	try {
		return (await User.findOne(query)) as IUser;
	} catch (err) {
		throw new Error(String(err));
	}
};

const getAll = async (): Promise<IUser[]> => {
	try {
		return (await User.find()) as IUser[];
	} catch (err) {
		throw new Error(String(err));
	}
};

const update = async (_id: string, query: object): Promise<IUser> => {
	try {
		return (await User.findByIdAndUpdate(_id, query, { new: true })) as IUser;
	} catch (err) {
		throw new Error(String(err));
	}
};

const remove = async (_id: string): Promise<IUser> => {
	try {
		return (await User.findByIdAndRemove(_id)) as IUser;
	} catch (err) {
		throw new Error(String(err));
	}
};

export default {
	create,
	get,
	getById,
	getAll,
	update,
	remove,
};
