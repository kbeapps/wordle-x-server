import { Response, Request } from 'express';
import controller from '../controllers/user.controller';
const responseHandler = require('./handlers/response.handler');

const get = async (req: Request, res: Response): Promise<void> => {
    let message: string | null = null;
    let status: number = 200;
    let user: object | null = null;

    try {
        user = await controller.get(req.body.query);
        if (!user) {
            message = 'user not found';
        }
    } catch (err) {
        status = 500;
        console.log(err);
    };

    responseHandler(res, status, 'getUser', message, user);
};

const update = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    let user: object | null = null;

    try {
        user = await controller.update(req.body._id, req.body.query);

    } catch (err) {
        status = 500;
        console.log(err);
    };

    responseHandler(res, status, 'updateUser', user);
};

const remove = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;

    try {
        await controller.remove(req.params._id);

    } catch (err) {
        status = 500;
        console.log(err);
    };

    responseHandler(res, status, 'removeUser');
};

export {
    get, update, remove
};

