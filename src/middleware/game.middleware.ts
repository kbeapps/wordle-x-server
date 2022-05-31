import { Response, Request } from 'express';
import controller from '../controllers/game.controller';

const get = async (req: Request, res: Response) => {
    try {
        const game = await controller.get(req.body.query);

        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const getAll = async (req: Request, res: Response) => {
    try {
        const game = await controller.getAll(req.params.ownerId);

        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const create = async (req: Request, res: Response) => {
    try {
        const game = await controller.create(
            req.body.name,
            req.body.ownerId,
            req.body.players,
            req.body.wordHistory,
            req.body.type,
            req.body.winCondition,
            req.body.wordSize,
            Object.keys(req.body).includes('theme') ? req.body.theme : null
        );

        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const update = async (req: Request, res: Response) => {
    try {
        const game = await controller.update(req.body._id, req.body.query);

        return res.status(200).send(game);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const remove = async (req: Request, res: Response) => {
    try {
        await controller.remove(req.params._id);

        return res.status(200).send();
    } catch (err) {
        return res.status(500).send(err);
    };
};

export {
    get, getAll, create, update, remove
};

