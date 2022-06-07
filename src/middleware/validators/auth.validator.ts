import { NextFunction, Request, Response } from 'express';
const responseHandler = require('../_handlers/response.handler');
const { processValidation } = require('./_helpers/process-validation.helpers');

const signup = (req: Request, res: Response, next: NextFunction) => {
  const requiredKeys: string[] = ['email', 'password', 'username'],
    minMaxKeys: string = '3/3',
    validationError = processValidation(minMaxKeys, req.body, requiredKeys);

  if (validationError) {
    responseHandler(res, 400, 'signup', undefined, validationError);
    return;
  }

  next();
};

const signin = (req: Request, res: Response, next: NextFunction) => {
  const requiredKeys: string[] = ['password'],
    allowedKeys: string[] = ['email', 'username'],
    minMaxKeys: string = '2/3',
    validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    responseHandler(res, 400, 'signin', undefined, validationError);
    return;
  }

  next();
};

export { signup, signin };
