import { Response, Request } from 'express';
import controller from '../controllers/user.controller';
import User, { IUser } from '../models/user.model';
import util from '../utils';

const source: string = 'userMiddleware';

const get = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let user: IUser = new User();

  try {
    user = await controller.get(req.body);
  } catch (err) {
    status = 500;
    util.errHandler(source, String(err));
  }

  util.responseHandler(res, status, 'getUser', user);
};

const update = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let user: IUser = new User();

  const query = { ...req.body };
  delete query._id;

  try {
    user = await controller.update(req.body._id, query);
  } catch (err) {
    status = 500;
    util.errHandler(source, String(err));
  }

  util.responseHandler(res, status, 'updateUser', user);
};

const remove = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;

  try {
    await controller.remove(req.params._id);
  } catch (err) {
    status = 500;
    util.errHandler(source, String(err));
  }

  util.responseHandler(res, status, 'removeUser');
};

export { get, update, remove };
