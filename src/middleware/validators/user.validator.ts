import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const get = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [];
  const allowedKeys: string[] = ['email', 'username'];
  const minMaxKeys: string = '1/1';
  const query: object = { [req.params.key]: req.params.value };
  const validationError = processValidation(minMaxKeys, query, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'get', undefined, validationError);
    return;
  }

  next();
};

const update = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [];
  const allowedKeys: string[] = ['email', 'username', 'password', 'avatar', 'games', 'friends', 'groups'];
  const minMaxKeys: string = '1/7';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'update', undefined, validationError);
    return;
  }

  next();
};

export { get, update };
