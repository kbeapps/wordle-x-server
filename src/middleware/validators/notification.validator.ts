import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler');
const { processValidation } = require('./_helpers/process-validation.helpers');

const create = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['userId', 'message'];
    const minMaxKeys: string = '2/2';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'create', validationError);
        return;
    }

    next();
};


const getAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['userId'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'getAll', validationError);
        return;
    }

    next();
};



const remove = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['_id'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'remove', validationError);
        return;
    }

    next();
};

const removeAll = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['userId'];
    const minMaxKeys: string = '1/1';
    const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'removeAll', validationError);
        return;
    }

    next();
};

export {
    create, getAll, remove, removeAll
};