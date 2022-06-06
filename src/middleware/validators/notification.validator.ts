import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler'),
    { processValidation } = require('./_helpers/process-validation.helpers');

const create = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['userId', 'message'],
        minMaxKeys: string = '2/2',
        validationError = processValidation(minMaxKeys, req.body, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'create', validationError);
        return;
    }

    next();
};


const getAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['userId'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'getAll', validationError);
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

const removeAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['userId'],
        minMaxKeys: string = '1/1',
        validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'removeAll', validationError);
        return;
    }

    next();
};

export {
    create, getAll, remove, removeAll
};