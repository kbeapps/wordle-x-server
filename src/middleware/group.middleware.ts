import { Response, Request } from 'express';
import controller from '../controllers/group.controller';
const responseHandler = require('./_handlers/response.handler');
const errHandler = require('./_handlers/err.handler');
const source: string = 'groupMiddleware';

const create = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    let group: object | null = null;

    try {
        group = await controller.create(req.body.ownerId, req.body.groupName, req.body.members);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };

    responseHandler(res, status, 'createGroup', group);
};

const get = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    let group: object | null = null;

    try {
        group = await controller.get(req.body.query);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };

    responseHandler(res, status, 'getGroup', group);
};

const getAll = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    let groups: object | null = null;

    try {
        groups = await controller.getAll(req.params.userId);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };

    responseHandler(res, status, 'getAllGroups', groups);
};

const update = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;
    let group: object | null = null;

    try {
        group = await controller.update(req.body._id, req.body.query);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };

    responseHandler(res, status, 'updateGroup', group);
};

const remove = async (req: Request, res: Response): Promise<void> => {
    let status: number = 200;

    try {
        await controller.remove(req.params._id);

    } catch (err) {
        status = 500;
        errHandler(source, err);
    };

    responseHandler(res, status, 'removeGroup');
};

export {
    create, get, getAll, update, remove
};