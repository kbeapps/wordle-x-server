import { Response, Request } from 'express';
import controller from '../controllers/user.controller';

const get = async (req: Request, res: Response) => {
    try {
        const user = await controller.get(req.body.query);

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const update = async (req: Request, res: Response) => {
    try {
        const user = await controller.update(req.body._id, req.body.query);

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    };
};

const remove = async (req: Request, res: Response) => {
    try {
        const user = await controller.remove(req.params._id);

        return res.status(200).send();
    } catch (err) {
        return res.status(500).send(err);
    };
};

export {
    get, update, remove
};

