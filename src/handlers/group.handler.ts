import { Response, Request } from 'express';
import controller from '../controllers/group.controller';
import Group, { IGroup } from '../models/group.model';
import utils from '../utils';

const source: string = 'groupMiddleware';

const create = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let group: IGroup = new Group();

  try {
    group = await controller.create(req.body.ownerId, req.body.groupName, req.body.members);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'createGroup', group);
};

const get = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let group: IGroup = new Group();

  try {
    group = await controller.get({ [req.params.key]: req.params.value });
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'getGroup', group);
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let groups: IGroup[] = [];

  try {
    groups = await controller.getAll(req.cookies._id);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'getAllGroups', groups);
};

const update = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;
  let group: IGroup = new Group();

  const query = { ...req.body };
  delete query._id;

  try {
    group = await controller.update(req.body._id, query);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'updateGroup', group);
};

const remove = async (req: Request, res: Response): Promise<void> => {
  let status: number = 200;

  try {
    await controller.remove(req.params._id);
  } catch (err) {
    status = 500;
    utils.errHandler(source, String(err));
  }

  utils.responseHandler(res, status, 'removeGroup');
};

export { create, get, getAll, update, remove };
