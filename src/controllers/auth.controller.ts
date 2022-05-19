import { Response, Request } from 'express';
import User from '../models/user.model';


// To be removed and placed in Auth Middleware
const signup = async (req: Request, res: Response) => {

    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    const duplicateEmail = await User.findOne({ email: user.email });

    if (duplicateEmail) {
        res.status(400).send({ message: 'email already in use.' });
        return;
    };

    // const confirm = await user.save();

    return res.send();
};

export {
    signup
};

