import { Response, Request } from 'express';
import controller from '../controllers/user.controller';
import User, { IUser } from '../models/user.model';
import utils from '../utils';

const source: string = 'userMiddleware';

const get = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let user: IUser = new User();

  try {
    user = await controller.get({ [req.params.key]: req.params.value });
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'getUser', user);
};

const getById = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let user: IUser = new User();

  try {
    user = await controller.getById(req.cookies._id);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'getUser', user);
};

const update = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let user: IUser = new User();

  const query = { ...req.body };

  try {
    user = await controller.update(req.cookies._id, query);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'updateUser', user);
};

const remove = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;

  try {
    await controller.remove(req.cookies._id);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'removeUser');
};

export { get, getById, update, remove };
