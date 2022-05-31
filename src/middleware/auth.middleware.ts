import { Response, Request } from 'express';
import userController from '../controllers/user.controller';
import bcrypt from 'bcrypt';
require('dotenv').config();

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
        let hashedPass: string = '';
        bcrypt.hash(req.body.password, Number(process.env.SALTROUNDS), (err, hash) => {
            if(hash) {
                hashedPass = hash;
            }

            if(err) {
                console.log(err);
                throw new Error();
            }
        });

        // JWT eventually

        // Create user
        // const user = await userController.create(req.body.email, 'hashedPass', req.body.username);

        // Return response
        return res.status(200).send(hashedPass);
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

