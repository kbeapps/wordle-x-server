import { Response, Request } from 'express';
import userController from '../controllers/user.controller';
import bcrypt from 'bcrypt';
const responseHandler = require('./_handlers/response.handler'),
    errHandler = require('./_handlers/err.handler'),
    source: string = 'authMiddleware';
require('dotenv').config();

const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
        return await bcrypt.hash(password, salt);
    } catch (err) {
        throw new Error(`err in hashPass: ${err}`);
    }
};

const confirmPassword = async (password: string, hash: string) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw new Error(`err in confirmPassword: ${err}`);
    }
};

const signup = async (req: Request, res: Response): Promise<void> => {
    let message: string = '',
        status: number = 200,
        hashedPassword: string = '';

    const isDupEmail = async (email: string) => {
        try {
            const duplicateEmail = await userController.get({ email: email });

            if (duplicateEmail) {
                message = 'email already in use.';
                status = 400;
                return true;
            };

            return false;
        } catch (err) {
            errHandler(source, err);
            status = 500;
            return true;
        }
    };

    const isDupUsername = async (username: string) => {
        try {
            const duplicateUsername = await userController.get({ username: username });

            if (duplicateUsername) {
                message = 'username already in use.';
                status = 400;
                return true;
            };

            return false;
        } catch (err) {
            errHandler(source, err);
            status = 500;
            return true;
        };
    };

    if (!await isDupEmail(req.body.email) && !await isDupUsername(req.body.username)) {
        try {
            hashedPassword = await hashPassword(req.body.password);

            await userController.create(req.body.email, hashedPassword, req.body.username);

            // JWT eventually
            // Cookies eventually
            message = 'User created';

        } catch (err) {
            errHandler(source, err);
            status = 500;
        }
    }

    responseHandler(res, status, 'signup', message);
};

const signin = async (req: Request, res: Response): Promise<void> => {
    interface IUser {
        password: string,
        friends?: string[],
        games?: string[],
        groups?: string[]
    }
    
    let message: string = '',
        passwordIsValid: boolean = false,
        status: number = 200,
        user: IUser = {
            password: ''
        };

    const userQuery = Object.keys(req.body).includes('email') ? { email: req.body.email } : { username: req.body.username };

    try {
        const foundUser = await userController.get(userQuery);
        if (foundUser) {
            user = foundUser;
        } else {
            message = 'user not found';
            status = 400;
        }

    } catch (err) {
        errHandler(source, err);
        status = 500;
    }

    if (Object.keys(user).length > 1) {
        try {
            passwordIsValid = await confirmPassword(req.body.password, user.password);
        } catch (err) {
            errHandler(source, err);
            status = 500;
        }

        if (!passwordIsValid) {
            status = 400;
            message = 'invalid password';
        }
    }

    const data = passwordIsValid ? {
        friends: user.friends,
        games: user.games,
        groups: user.groups
    } : null;

    responseHandler(res, status, 'signin', message, data);
};

export {
    signup, signin
};