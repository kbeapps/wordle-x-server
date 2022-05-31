import { Response, Request } from 'express';
import controller from '../controllers/notification.controller';

const getAll = async (req: Request, res: Response) => {
    try {
        const notifications = await controller.getAll(req.params.userId);

        return res.status(200).send(notifications);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const create = async (req: Request, res: Response) => {
    try {
        const notification = await controller.create(req.body.userId, req.body.message);

        return res.status(200).send(notification);
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

const removeAll = async (req: Request, res: Response) => {
    try {
        await controller.removeAll(req.params.userId);

        return res.status(200).send();
    } catch (err) {
        return res.status(500).send(err);
    };
};

export {
    getAll, create, remove, removeAll
};