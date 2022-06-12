import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const create = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['ownerId', 'groupName', 'members'];
  const minMaxKeys: string = '3/3';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'create group', undefined, validationError);
    return;
  }

  next();
};

const get = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [];
  const allowedKeys: string[] = ['_id', 'ownerId'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'get group', undefined, validationError);
    return;
  }

  next();
};

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [];
  const allowedKeys: string[] = ['userId', 'ownerId'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.params, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'get all groups', undefined, validationError);
    return;
  }

  next();
};

const update = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const allowedKeys: string[] = ['groupName', 'members'];
  const minMaxKeys: string = '2/3';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'update group', undefined, validationError);
    return;
  }

  next();
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, req.params, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'remove group', undefined, validationError);
    return;
  }

  next();
};

export { create, get, getAll, update, remove };
