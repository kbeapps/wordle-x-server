import { Response, Request } from 'express';
import User from '../models/user.model';

export class AuthController {

    async signup(req: Request, res: Response) {
        console.log('signing up');

        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        const confirm = await user.save();

        return res.send(confirm);

    };
}