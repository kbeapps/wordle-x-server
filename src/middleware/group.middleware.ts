import { Response, Request, response } from 'express';
import controller from '../controllers/group.controller';
const responseHandler = require('./handlers/response.handler');

const create = async (req: Request, res: Response) => {
    let status: number = 200;
    let message: string = '';
    let group: object|null = null;

    try {
        group = await controller.create(req.body.ownerId, req.body.groupName, req.body.members);
        status = 200;
        message= 'Group created';
        
    } catch (err) {
        status = 500;
        message = `${err}`;
    };

    responseHandler(res, status, 'createGroup', message, group);
};

const get = async (req: Request, res: Response) => {
    let status: number = 200;
    let message: string = '';
    let group: object|null = null;

    try {
        group = await controller.get(req.body.query);
        status = 200;

    } catch (err) {
        status = 500;
        message = `${err}`;
    };

    responseHandler(res, status, 'getGroup', message, group);
};

const getAll = async (req: Request, res: Response) => {
    let status: number = 200;
    let message: string = '';
    let groups: object|null = null;

    try {
        groups = await controller.getAll(req.params.userId);
        status = 200;

    } catch (err) {
        status = 500;
        message = `${err}`;
    };

    responseHandler(res, status, 'getAllGroups', message, groups);
};

const update = async (req: Request, res: Response) => {
    let status: number = 200;
    let message: string = '';
    let group: object|null = null;

    try {
        group = await controller.update(req.body._id, req.body.query);
        status = 200;
        message = 'Group updated';

    } catch (err) {
        status = 500;
        message = `${err}`;
    };

    responseHandler(res, status, 'updateGroup', message, group);
};

const remove = async (req: Request, res: Response) => {
    let status: number = 200;
    let message: string = '';

    try {
        await controller.remove(req.params._id);
        status = 200;
        message = 'Group deleted';

    } catch (err) {
        status = 500;
        message = `${err}`;
    };

    responseHandler(res, status, 'removeGroup', message);
};

export {
    create, get, getAll, update, remove
};