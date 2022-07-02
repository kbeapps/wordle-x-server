import { NextFunction, Request, Response } from 'express';
import utils from '../../utils';

export const validateCookies = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.cookies._id) {
    utils.responseHandler(res, 403, 'signin', undefined, 'Invalid cookies.  Required: [ _id ]');
    return;
  }
  next();
};
