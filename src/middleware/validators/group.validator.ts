import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler'),
    { processValidation } = require('./_helpers/process-validation.helpers');

const create = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['ownerId', 'groupName', 'members'],
        minMaxKeys: string = '3/3',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'create group', validationError);
        return;
    }

    next();
};

const get = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [],
        allowedKeys: string[] = ['_id', 'ownerId'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get group', validationError);
        return;
    }

    next();
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [],
        allowedKeys: string[] = ['userId', 'ownerId'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.params, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get all groups', validationError);
        return;
    }

    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'],
        allowedKeys: string[] = ['groupName', 'members'],
        minMaxKeys: string = '2/3',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'update group', validationError);
        return;
    }

    next();
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'remove group', validationError);
        return;
    }

    next();
};

export {
    create, get, getAll, update, remove
};