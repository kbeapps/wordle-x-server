import { Response, Request } from 'express';
import User from '../models/user.model';
import controller from '../controllers/user.controller';


const signup = async (req: Request, res: Response) => {

    const user = await controller.create(req.body.email, req.body.password, req.body.username);
    // const user = new User({
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password
    // });

    // const duplicateEmail = await User.findOne({ email: user.email });

    // if (duplicateEmail) {
    //     res.status(400).send({ message: 'email already in use.' });
    //     return;
    // };

    // const confirm = await user.save();

    return res.send(user);
};

const getUser = async (req: Request, res: Response) => {
    const user = await controller.get('_id', '628c1073199a943a9a7a24fd');
    console.log(user);
    return res.send(user);
};

export {
    signup, getUser
};

