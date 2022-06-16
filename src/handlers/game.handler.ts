import { Response, Request } from 'express';
import controller from '../controllers/game.controller';
import Game, { IGame } from '../models/game.model';
import utils from '../utils';
import * as dotenv from 'dotenv';

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
    games = await controller.getAll({ [req.params.key]: req.params.value });
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

export { create, get, getAll, update, remove };
