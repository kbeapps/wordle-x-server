import { Response, Request } from 'express';
import controller from '../controllers/notification.controller';
const responseHandler = require('./_handlers/response.handler');
const errHandler = require('./_handlers/err.handler');
const source: string = 'notificationMiddleware';

const create = async (req: Request, res: Response): Promise<void> => {
    let notification: object | null = null;
    let status: number = 200;

    try {
        notification = await controller.create(req.body.userId, req.body.message);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };
    responseHandler(res, status, 'createNotification', notification);

};

const getAll = async (req: Request, res: Response): Promise<void> => {
    let message: string | null = null;
    let notifications: object[] | null = null;
    let status: number = 200;
    try {
        notifications = await controller.getAll(req.params.userId);
        if (!notifications) {
            message = 'no notifications';
        }
    } catch (err) {
        status = 500;
        errHandler(source, err);
    };
    responseHandler(res, status, 'getAllNotifications', message, notifications);

};

const remove = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    try {
        await controller.remove(req.params._id);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };
    responseHandler(res, status, 'removeNotification');
};

const removeAll = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    try {
        await controller.removeAll(req.params.userId);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };
    responseHandler(res, status, 'removeAllNotifications');
};

export {
    create, getAll, remove, removeAll
};