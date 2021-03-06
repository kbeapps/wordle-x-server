import { Response, Request, CookieOptions } from 'express';
import userController from '../controllers/user.controller';
import gameController from '../controllers/game.controller';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import utils from '../utils';
import * as dotenv from 'dotenv';

dotenv.config();

const source: string = 'authMiddleware';

const cookieParams: CookieOptions = {
	maxAge: 3 * 24 * 60 * 60 * 1000,
	sameSite: 'none',
	path: '/',
	secure: true,
	httpOnly: true,
};

const hashPassword = async (password: string): Promise<string> => {
	try {
		const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
		return await bcrypt.hash(password, salt);
	} catch (err) {
		throw new Error(`err in hashPass: ${err}`);
	}
};

const confirmPassword = async (
	password: string,
	hash: string
): Promise<boolean> => {
	try {
		return await bcrypt.compare(password, hash);
	} catch (err) {
		throw new Error(`err in confirmPassword: ${err}`);
	}
};

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

const signup = async (req: Request, res: Response): Promise<void> => {
	let message: string = '';
	let status: number = 200;
	let hashedPassword: string = '';
	let user: IUser = new User();

	const isDupEmail = async (email: string): Promise<boolean> => {
		try {
			const duplicateEmail = await userController.get({ email: email });

			if (duplicateEmail) {
				message = 'email already in use.';
				status = 400;
				return true;
			}

			return false;
		} catch (err) {
			utils.errHandler(source, String(err));
			status = 500;
			return true;
		}
	};

	const isDupUsername = async (username: string): Promise<boolean> => {
		try {
			const duplicateUsername = await userController.get({
				username: username,
			});

			if (duplicateUsername) {
				message = 'username already in use.';
				status = 400;
				return true;
			}

			return false;
		} catch (err) {
			utils.errHandler(source, String(err));
			status = 500;
			return true;
		}
	};

	if (
		!(await isDupEmail(req.body.email)) &&
		!(await isDupUsername(req.body.username))
	) {
		try {
			user.email = req.body.email;
			user.username = req.body.username;

			hashedPassword = await hashPassword(req.body.password);
			user.password = hashedPassword;
			user = await userController.create(user);

			// Get game and add daily game to user payload
			const dailyGame = await gameController.get({ name: 'main daily' });

			// Add user to main daily
			if (dailyGame) {
				try {
					dailyGame.players.push(String(user._id));
					await gameController.update(String(dailyGame._id), {
						players: dailyGame.players,
					});

					user.games?.push(String(dailyGame._id));
					await userController.update(String(user._id), { games: user.games });
				} catch (error) {
					utils.errHandler(source, String(error));
					status = 500;
				}
			}

			// JWT eventually

			message = 'User created';
		} catch (err) {
			utils.errHandler(source, String(err));
			status = 500;
		}
	}

	res.cookie('_id', user._id, cookieParams);

	const data = status === 200 ? createUserPayload(user) : undefined;

	utils.responseHandler(res, status, 'signup', data, message);
};

const signin = async (req: Request, res: Response): Promise<void> => {
	let message: string = '';
	let passwordIsValid: boolean = false;
	let status: number = 200;
	let user: IUser = new User();

	const userQuery = Object.keys(req.body).includes('email')
		? { email: req.body.email }
		: { username: req.body.username };

	try {
		user = await userController.get(userQuery);

		if (!user) {
			message = 'user not found';
			status = 400;
		}
	} catch (err) {
		utils.errHandler(source, String(err));
		status = 500;
	}

	if (user) {
		try {
			passwordIsValid = await confirmPassword(req.body.password, user.password);
		} catch (err) {
			utils.errHandler(source, String(err));
			status = 500;
		}

		if (!passwordIsValid) {
			status = 400;
			message = 'invalid password';
		}
	}

	res.cookie('_id', user._id, cookieParams);

	const data = status === 200 ? createUserPayload(user) : undefined;

	utils.responseHandler(res, status, 'signin', data, message);
};

export { signup, signin };
