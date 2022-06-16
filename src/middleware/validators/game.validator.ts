import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';
import { processValidation } from './helpers/process-validation.helpers';

const create = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [
    'name',
    'ownerId',
    'players',
    'wordHistory',
    'type',
    'winCondition',
    'wordSize',
  ];
  const allowedKeys: string[] = ['theme'];
  const minMaxKeys: string = '7/8';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'create game', undefined, validationError);
    return;
  }

  next();
};

const get = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = [];
  const allowedKeys: string[] = ['_id'];
  const minMaxKeys: string = '1/1';
  const query: object = { [req.params.key]: req.params.value };
  const validationError = processValidation(minMaxKeys, query, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'get game', undefined, validationError);
    return;
  }

  next();
};

const getAll = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['ownerId'];
  const minMaxKeys: string = '1/1';
  const query: object = { [req.params.key]: req.params.value };
  const validationError = processValidation(minMaxKeys, query, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'get all games', undefined, validationError);
    return;
  }

  next();
};

const update = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const allowedKeys: string[] = [
    'name',
    'players',
    'wordHistory',
    'boards',
    'type',
    'winCondition',
    'wordSize',
  ];
  const minMaxKeys: string = '2/8';
  const validationError = processValidation(minMaxKeys, req.body, requiredKeys, allowedKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'update game', undefined, validationError);
    return;
  }

  next();
};

const remove = (req: Request, res: Response, next: NextFunction): void => {
  const requiredKeys: string[] = ['_id'];
  const minMaxKeys: string = '1/1';
  const validationError = processValidation(minMaxKeys, { _id: req.params._id }, requiredKeys);

  if (validationError) {
    utils.responseHandler(res, 400, 'remove game', undefined, validationError);
    return;
  }

  next();
};

export { create, get, getAll, update, remove };
