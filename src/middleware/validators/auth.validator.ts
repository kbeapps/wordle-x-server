import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler');
const { processValidation } = require('./_helpers/process-validation.helpers');

const signup = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['email', 'password', 'username'];
    const minMaxKeys: string = '3/3';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys);

    if (validationError) {
        responseHandler(res, 400, 'signup', validationError);
        return;
    }

    next();
};

const signin = (req: Request, res: Response, next: NextFunction) => {
    const requiredKeys: string[] = ['password'];
    const allowedKeys: string[] = ['email', 'username', 'boards'];
    const minMaxKeys: string = '2/3';
    const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

    if (validationError) {
        responseHandler(res, 400, 'signin', validationError);
        return;
    }

    next();
};

export {
    signup, signin
};