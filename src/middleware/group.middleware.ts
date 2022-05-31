import { Response, Request } from 'express';
import controller from '../controllers/group.controller';

const get = async (req: Request, res: Response) => {
    try {
        const group = await controller.get(req.body.query);

        return res.status(200).send(group);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const getAll = async (req: Request, res: Response) => {
    try {
        const groups = await controller.getAll(req.params.userId);

        return res.status(200).send(groups);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const create = async (req: Request, res: Response) => {
    try {
        const group = await controller.create(req.body.ownerId, req.body.groupName, req.body.members);

        return res.status(200).send(group);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const update = async (req: Request, res: Response) => {
    try {
        const group = await controller.update(req.body._id, req.body.query);

        return res.status(200).send(group);
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