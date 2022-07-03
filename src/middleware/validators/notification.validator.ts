import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const create = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['userId', 'message'];
  const minMaxKeys: string = '2/2';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'create', undefined, validationError);
    return;
  }

  next();
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'remove', undefined, validationError);
    return;
  }

  next();
};

const removeAll = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['userId'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'removeAll', undefined, validationError);
    return;
  }

  next();
};

export { create, remove, removeAll };
