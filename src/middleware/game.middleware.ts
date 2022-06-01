import { Response, Request } from 'express';
import controller from '../controllers/game.controller';
const responseHandler = require('./handlers/response.handler');
require('dotenv').config();

const create = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;

    try {
        game = await controller.create(
            req.body.name,
            req.body.ownerId,
            req.body.players,
            req.body.wordHistory,
            req.body.type,
            req.body.winCondition,
            req.body.wordSize,
            Object.keys(req.body).includes('theme') ? req.body.theme : null
        );

    } catch (err) {
        status = 500;
        console.log(err);
    };

    responseHandler(res, status, 'createGame', game);
};

const get = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;
    try {
        game = await controller.get(req.body.query);
    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'getGame', game);
};

const getAll = async (req: Request, res: Response) => {
    let games: object | null = null;
    let status: number = 200;
    try {
        games = await controller.getAll(req.params.ownerId);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'getAllGames', games);
};

const update = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;
    try {
        game = await controller.update(req.body._id, req.body.query);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'updateGame', game);
};

const remove = async (req: Request, res: Response) => {
    let status: number = 200;
    try {
        await controller.remove(req.params._id);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'deleteGame');
};

export {
    get, getAll, create, update, remove
};

