import { Response, Request } from 'express';
import controller from '../controllers/notification.controller';
const responseHandler = require('./handlers/response.handler');

const create = async (req: Request, res: Response): Promise<void> => {
    let notification: object | null = null;
    let status: number = 200;

    try {
        notification = await controller.create(req.body.userId, req.body.message);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'createNotification', notification);

};

const getAll = async (req: Request, res: Response): Promise<void> => {
    let notifications: object[] | null = null;
    let status: number = 200;
    try {
        notifications = await controller.getAll(req.params.userId);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'getAllNotifications', notifications);

};

const remove = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    try {
        await controller.remove(req.params._id);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'removeNotification');
};

const removeAll = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    try {
        await controller.removeAll(req.params.userId);

    } catch (err) {
        status = 500;
        console.log(err);
    };
    responseHandler(res, status, 'removeAllNotifications');
};

export {
    create, getAll, remove, removeAll
};