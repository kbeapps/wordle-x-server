import { Response, Request } from 'express';
import userController from '../controllers/user.controller';
import bcrypt from 'bcrypt';
require('dotenv').config();

const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    } catch (err) {
        throw new Error(`err in hashPass: ${err}`);
    };
};

const signup = async (req: Request, res: Response) => {
    interface IPayload {
        message: string,
        user?: object
    }

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

    if(!await isDupEmail(req.body.email) && !await isDupUsername(req.body.username)) {
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

    if(Object.keys(user).length) {
        payload.user = user;
    }

    return res.status(status).send(payload);
};

const signin = async (req: Request, res: Response) => {
    return res.send();
};

export {
    signup, signin
};

