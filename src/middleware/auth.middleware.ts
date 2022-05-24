import { Response, Request } from 'express';
import User from '../models/user.model';
import controller from '../controllers/user.controller';

const signup = async (req: Request, res: Response) => {
    try {
        console.log('\n\n\n', req.body);
        const user = await controller.create(req.body.email, req.body.password, req.body.username);

        // const duplicateEmail = await User.findOne({ email: user.email });

        // if (duplicateEmail) {
        //     res.status(400).send({ message: 'email already in use.' });
        //     return;
        // };
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }

};

const getUser = async (req: Request, res: Response) => {
    const user = await controller.get('_id', '628c1073199a943a9a7a24fd');
    console.log(user);
    return res.send(user);
};

export {
    signup, getUser
};

