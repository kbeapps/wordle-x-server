import { Response, Request } from 'express';
import userController from '../controllers/user.controller';
import bcrypt from 'bcrypt';
require('dotenv').config();

interface IPayload {
    message: string,
    user?: object
};

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

const signup = async (req: Request, res: Response) => {
    let message: string = '';
    let status: number = 200;

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
            status = 500;
            message = 'something went wrong';
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
            status = 500;
            message = 'something went wrong';
            return true;
        };
    };

    let hashedPassword: string = '';
    let user: object = {};

    if (!await isDupEmail(req.body.email) && !await isDupUsername(req.body.username)) {
        try {
            hashedPassword = await hashPassword(req.body.password);

            user = await userController.create(req.body.email, hashedPassword, req.body.username);

            // JWT eventually
            // Cookies eventually

        } catch (err) {
            console.log(err);
            status = 500;
            message = 'something went wrong';
        } finally {
            message = 'User created';
        };
    }

    let payload: IPayload = {
        message: message,
    };

    if (Object.keys(user).length) {
        payload.user = user;
    }

    return res.status(status).send(payload);
};

const signin = async (req: Request, res: Response) => {
    let message: string = '';
    let status: number = 200;

    const userQuery = Object.keys(req.body).includes('email') ? { email: req.body.email } : { username: req.body.username };

    interface IUser {
        password: string,
        friends?: string[],
        games?: string[],
        groups?: string[]
    }

    let user: IUser = {
        password: ''
    };

    try {
        const getUser = await userController.get(userQuery);
        user = getUser ? getUser : user;
    } catch (err) {
        message = 'user not found';
        status = 400;
    }

    let payload: IPayload = {
        message: message
    };
    if (Object.keys(user).length > 1) {
        let passwordIsValid: boolean = false;
        try {
            passwordIsValid = await confirmPassword(req.body.password, user.password);
        } catch (err) {
            status = 500;
            payload.message = 'something went wrong';
        }
        payload.message = passwordIsValid ? 'signin successful' : 'invalid password';
        if (passwordIsValid) {
            payload.user = {
                friends: user.friends,
                games: user.games,
                groups: user.groups
            };
        }
    }

    return res.status(status).send(payload);
};

export {
    signup, signin
};

