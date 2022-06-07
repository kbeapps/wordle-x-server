import { Response, Request } from 'express';
import userController from '../controllers/user.controller';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import util from '../utils';
import * as dotenv from 'dotenv';

dotenv.config();

const source: string = 'authMiddleware';

const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error(`err in hashPass: ${err}`);
  }
};

const confirmPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(`err in confirmPassword: ${err}`);
  }
};

const signup = async (req: Request, res: Response): Promise<void> => {
  let message: string = '';
  let status: number = 200;
  let hashedPassword: string = '';

  const isDupEmail = async (email: string): Promise<boolean> => {
    try {
      const duplicateEmail = await userController.get({ email: email });

      if (duplicateEmail) {
        message = 'email already in use.';
        status = 400;
        return true;
      }

      return false;
    } catch (err) {
      util.errHandler(source, String(err));
      status = 500;
      return true;
    }
  };

  const isDupUsername = async (username: string): Promise<boolean> => {
    try {
      const duplicateUsername = await userController.get({
        username: username,
      });

      if (duplicateUsername) {
        message = 'username already in use.';
        status = 400;
        return true;
      }

      return false;
    } catch (err) {
      util.errHandler(source, String(err));
      status = 500;
      return true;
    }
  };

  if (!(await isDupEmail(req.body.email)) && !(await isDupUsername(req.body.username))) {
    try {
      hashedPassword = await hashPassword(req.body.password);
      await userController.create(req.body.email, hashedPassword, req.body.username);

      // JWT eventually
      // Cookies eventually
      message = 'User created';
    } catch (err) {
      util.errHandler(source, String(err));
      status = 500;
    }
  }

  util.responseHandler(res, status, 'signup', undefined, message);
};

const signin = async (req: Request, res: Response): Promise<void> => {
  let message: string = '';
  let passwordIsValid: boolean = false;
  let status: number = 200;
  let user: IUser = new User();

  const userQuery = Object.keys(req.body).includes('email')
    ? { email: req.body.email }
    : { username: req.body.username };

  try {
    const foundUser = await userController.get(userQuery);
    if (foundUser) {
      user = foundUser;
    } else {
      message = 'user not found';
      status = 400;
    }
  } catch (err) {
    util.errHandler(source, String(err));
    status = 500;
  }

  if (Object.keys(user).length > 1) {
    try {
      passwordIsValid = await confirmPassword(req.body.password, user.password);
    } catch (err) {
      util.errHandler(source, String(err));
      status = 500;
    }

    if (!passwordIsValid) {
      status = 400;
      message = 'invalid password';
    }
  }

  const data = passwordIsValid
    ? {
        friends: user.friends,
        games: user.games,
        groups: user.groups,
      }
    : null;

  util.responseHandler(res, status, 'signin', data ? data : undefined, message);
};

export { signup, signin };
