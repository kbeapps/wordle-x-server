import { NextFunction, Request, Response } from 'express';
import util from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const create = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['userId', 'message'],
    minMaxKeys: string = '2/2',
    validationError = processValidation(minMaxKeys, req.body, requiredKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'create', undefined, validationError);
    return;
  }

  next();
};

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['userId'],
    minMaxKeys: string = '1/1',
    validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'getAll', undefined, validationError);
    return;
  }

  next();
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'],
    minMaxKeys: string = '1/1',
    validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'remove', undefined, validationError);
    return;
  }

  next();
};

const removeAll = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['userId'],
    minMaxKeys: string = '1/1',
    validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    util.responseHandler(res, 400, 'removeAll', undefined, validationError);
    return;
  }

  next();
};

export { create, getAll, remove, removeAll };
