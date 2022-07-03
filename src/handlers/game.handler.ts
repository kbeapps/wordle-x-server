import { Response, Request } from 'express';
import controller from '../controllers/game.controller';
import Game, { IGame } from '../models/game.model';
import utils from '../utils';
import * as dotenv from 'dotenv';
import userController from '../controllers/user.controller';
import User, { IUser } from '../models/user.model';

dotenv.config();

const source: string = 'gameMiddleware';

const create = async (req: Request, res: Response): Promise<void> => {
	let game: IGame = new Game();
	let status: number = 200;

	try {
		game = (await controller.create(
			req.body.name,
			req.body.ownerId,
			req.body.players,
			req.body.wordHistory,
			req.body.type,
			req.body.winCondition,
			req.body.wordSize,
			Object.keys(req.body).includes('theme') ? req.body.theme : null
		)) as IGame;
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}

	utils.responseHandler(res, status, 'createGame', game);
};

const createMainDaily = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;
	let game: IGame = new Game();
	let dailyOwner: IUser = new User();
	let users: IUser[] = [];

	const mainDailyGame = await controller.get({ name: 'main daily' });

	try {
		dailyOwner = await userController.get({ name: 'admin' });
	} catch (error) {
		status = 500;
		utils.errHandler(source, String(error));
	}

	if (!mainDailyGame && dailyOwner._id) {
		let players: string[] = [];

		try {
			users = await userController.getAll();
			players = users.map((user: IUser) => String(user._id));
		} catch (error) {
			status = 500;
			utils.errHandler(source, String(error));
		}

		try {
			game = (await controller.create(
				'main daily',
				String(dailyOwner._id),
				players,
				[],
				'daily',
				'none',
				'5'
			)) as IGame;
		} catch (error) {
			status = 500;
			utils.errHandler(source, String(error));
		}

		try {
			const updateUsers = await users.map((user) =>
				userController.update(String(user._id), {
					games: user.games?.push(String(game._id)),
				})
			);
		} catch (error) {
			status = 500;
			utils.errHandler(source, String(error));
		}
	}

	// retrieve random word from API for daily game
	// set word for daily game
	// update game

	utils.responseHandler(res, status, 'createGame', game);
};

const get = async (req: Request, res: Response): Promise<void> => {
	let game: IGame = new Game();
	let status: number = 200;

	try {
		game = await controller.get({ [req.params.key]: req.params.value });
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}
	utils.responseHandler(res, status, 'getGame', game);
};

const getAll = async (req: Request, res: Response): Promise<void> => {
	let games: IGame[] = [];
	let status: number = 200;

	try {
		games = await controller.getAll(req.cookies._id);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}
	utils.responseHandler(res, status, 'getAllGames', games);
};

const update = async (req: Request, res: Response): Promise<void> => {
	let game: IGame = new Game();
	let status: number = 200;

	const query = { ...req.body };
	delete query._id;

	try {
		game = await controller.update(req.body._id, query);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}
	utils.responseHandler(res, status, 'updateGame', game);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	let status: number = 200;

	try {
		await controller.remove(req.params._id);
	} catch (err) {
		status = 500;
		utils.errHandler(source, String(err));
	}
	utils.responseHandler(res, status, 'deleteGame');
};

export { create, createMainDaily, get, getAll, update, remove };
