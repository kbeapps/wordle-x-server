import { Response, Request } from 'express';
import controller from '../controllers/user.controller';
import User, { IUser } from '../models/user.model';
import utils from '../utils';

const source: string = 'userMiddleware';

const createUserPayload = (user: IUser): Partial<IUser> => {
	return {
		_id: user._id,
		avatar: user.avatar,
		email: user.email,
		username: user.username,
		friends: user.friends,
		games: user.games,
		groups: user.groups,
	};
};

const get = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;
	let user: IUser = new User();
	let payload;

	try {
		user = await controller.get({ [req.params.key]: req.params.value });
		payload = createUserPayload(user);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}

	utils.responseHandler(res, status, 'getUser', payload);
};

const getById = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;
	let user: IUser = new User();
	let payload;

	try {
		user = await controller.getById(req.cookies._id);
		payload = createUserPayload(user);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}

	utils.responseHandler(res, status, 'getUser', payload);
};

const getAll = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;
	let users: IUser[] = [];
	let payload;

	try {
		users = await controller.getAll();
		payload = users.map((user: IUser) => user._id);

		console.log(payload);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}

	utils.responseHandler(res, status, 'getUser', payload);
};

const update = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;
	let user: IUser = new User();
	let payload;

	const query = { ...req.body };

	try {
		user = await controller.update(req.cookies._id, query);
		payload = createUserPayload(user);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}

	utils.responseHandler(res, status, 'updateUser', payload);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;

	try {
		await controller.remove(req.cookies._id);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}

	utils.responseHandler(res, status, 'removeUser');
};

export { get, getById, getAll, update, remove };
