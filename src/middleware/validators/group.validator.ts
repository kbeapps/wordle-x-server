import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler');
const { processValidation } = require('./_helpers/process-validation.helpers');

const create = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['ownerId', 'groupName', 'members'];
    const minMaxKeys: string = '3/3';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'create group', validationError);
        return;
    }

    next();
};

const get = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [];
    const allowedKeys: string[] = ['_id', 'ownerId'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get group', validationError);
        return;
    }

    next();
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [];
    const allowedKeys: string[] = ['userId', 'ownerId'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.params, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get all groups', validationError);
        return;
    }

    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'];
    const allowedKeys: string[] = ['groupName', 'members'];
    const minMaxKeys: string = '2/3';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'update group', validationError);
        return;
    }

    next();
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'remove group', validationError);
        return;
    }

    next();
};

export {
    create, get, getAll, update, remove
};