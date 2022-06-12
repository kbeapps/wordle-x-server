import { Types } from 'mongoose';
import Notification, { INotification } from '../models/notification.model';

const create = async (userId: string, message: string): Promise<INotification> => {
  const notification: INotification = new Notification({
    userId: userId,
    message: message,
  });

  try {
    return (await notification.save()) as INotification;
  } catch (err) {
    throw new Error(String(err));
  }
};

const getAll = async (userId: string): Promise<INotification[]> => {
  try {
    return (await Notification.find({ userId: userId })) as INotification[];
  } catch (err) {
    throw new Error(String(err));
  }
};

const remove = async (_id: string): Promise<INotification> => {
  try {
    return (await Notification.findByIdAndRemove(_id)) as INotification;
  } catch (err) {
    throw new Error(String(err));
  }
};

const removeAll = async (userId: string): Promise<object> => {
  try {
    return await Notification.deleteMany({ userId: userId });
  } catch (err) {
    throw new Error(String(err));
  }
};

export default {
  create,
  getAll,
  remove,
  removeAll,
};
