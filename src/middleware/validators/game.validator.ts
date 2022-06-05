import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler');
const { processValidation } = require('./_helpers/process-validation.helpers');

const create = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['name', 'ownerId', 'players', 'wordHistory', 'boards', 'type', 'winCondition', 'wordSize'];
    const allowedKeys: string[] = ['theme'];
    const minMaxKeys: string = '8/9';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);




    if (validationError) {
        responseHandler(res, 400, 'create game', validationError);
        return;
    }

    next();
};

const get = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = [];
    const allowedKeys: string[] = ['_id'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'create game', validationError);
        return;
    }

    next();
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['ownerId'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, { ownerId: req.params }, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'create game', validationError);
        return;
    }

    next();
};

const update = (req: Request, res: Response, next: NextFunction) => {

};

const remove = (req: Request, res: Response, next: NextFunction) => {

};

export {
    create, get, getAll, update, remove
};