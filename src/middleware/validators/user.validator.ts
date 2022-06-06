import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler'),
    { processValidation } = require('./_helpers/process-validation.helpers');

const get = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [],
        allowedKeys: string[] = ['email', 'username', '_id'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get', validationError);
        return;
    }

    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'],
        allowedKeys: string[] = ['email', 'username', 'password', 'avatar', 'games', 'friends', 'groups'],
        minMaxKeys: string = '2/7',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'update', validationError);
        return;
    }

    next();
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'remove', validationError);
        return;
    }

    next();
};

export {
    get, update, remove
};