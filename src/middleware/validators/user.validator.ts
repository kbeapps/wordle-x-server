import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler');
const { processValidation } = require('./_helpers/process-validation.helpers');

const get = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [];
    const allowedKeys: string[] = ['email', 'username', '_id'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get', validationError);
        return;
    }

    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'];
    const allowedKeys: string[] = ['email', 'username', 'password', 'avatar', 'games', 'friends', 'groups'];
    const minMaxKeys: string = '1/7';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'update', validationError);
        return;
    }

    next();
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, { _id: req.params._id }, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'remove', validationError);
        return;
    }

    next();
};

export {
    get, update, remove
};