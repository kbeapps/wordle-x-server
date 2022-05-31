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
        console.log('err in hashPass: ', err);
        return 'error';
    };
};

const signup = async (req: Request, res: Response) => {
    try {
        // Check for duplicates in email
        const duplicateEmail = await userController.get({ email: req.body.email });

        if (duplicateEmail) {
            res.status(400).send({ message: 'email already in use.' });
            return;
        };

        // Check for duplicates in username
        const duplicateUsername = await userController.get({ username: req.body.username });

        if (duplicateUsername) {
            res.status(400).send({ message: 'username already in use.' });
            return;
        };

        // Hash password
        const hashedPassword = await hashPassword(req.body.password);

        // JWT eventually

        // Create user
        // const user = await userController.create(req.body.email, 'hashedPass', req.body.username);

        // Return response
        return res.status(200).send(hashedPassword);
    } catch (err) {
        return res.status(500).send(err);
    }

};

const getUser = async (req: Request, res: Response) => {
    // const user = await controller.get('_id', '628c1073199a943a9a7a24fd');
    // console.log(user);
    // return res.send(user);
    return res.send();
};

export {
    signup, getUser
};

