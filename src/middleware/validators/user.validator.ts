import { NextFunction, Request, Response } from 'express';
import util from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const get = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [];
  const allowedKeys: string[] = ['email', 'username', '_id'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'get', undefined, validationError);
    return;
  }

  next();
};

const update = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const allowedKeys: string[] = [
    'email',
    'username',
    'password',
    'avatar',
    'games',
    'friends',
    'groups',
  ];
  const minMaxKeys: string = '2/7';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'update', undefined, validationError);
    return;
  }

  next();
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'remove', undefined, validationError);
    return;
  }

  next();
};

export { get, update, remove };
