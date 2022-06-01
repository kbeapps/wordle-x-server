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
    };

    responseHandler(res, status, 'create game', game);
};

const get = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;
    try {
        game = await controller.get(req.body.query);
    } catch (err) {
        status = 500;
    };
    responseHandler(res, status, 'get game', game);
};

const getAll = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;
    try {
        game = await controller.getAll(req.params.ownerId);

    } catch (err) {
        status = 500;
    };
    responseHandler(res, status, 'get all games', game);
};

const update = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;
    try {
        game = await controller.update(req.body._id, req.body.query);

    } catch (err) {
        status = 500;
    };
    responseHandler(res, status, 'update game', game);
};

const remove = async (req: Request, res: Response) => {
    let game: object | null = null;
    let status: number = 200;
    try {
        await controller.remove(req.params._id);

    } catch (err) {
        status = 500;
    };
    responseHandler(res, status, 'delete game');
};

export {
    get, getAll, create, update, remove
};

