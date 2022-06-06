import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler'),
    { processValidation } = require('./_helpers/process-validation.helpers');

const create = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['name', 'ownerId', 'players', 'wordHistory', 'type', 'winCondition', 'wordSize'],
        allowedKeys: string[] = ['theme'],
        minMaxKeys: string = '7/8',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'create game', validationError);
        return;
    }

    next();
};

const get = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [],
        allowedKeys: string[] = ['_id'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.params, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'get game', validationError);
        return;
    }

    next();
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['ownerId'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, { ownerId: req.params.ownerId }, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'get all games', validationError);
        return;
    }

    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'],
        allowedKeys: string[] = ['name', 'players', 'wordHistory', 'boards', 'type', 'winCondition', 'wordSize'],
        minMaxKeys: string = '2/8',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'update game', validationError);
        return;
    }

    next();
};

const remove = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, { _id: req.params._id }, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'remove game', validationError);
        return;
    }

    next();
};

export {
    create, get, getAll, update, remove
};