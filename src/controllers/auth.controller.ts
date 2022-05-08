import { Request, Response } from 'express';
const db = require('../models');
const User = db.user;

interface SignupResponse {
    data: {
        hasSucceeded: boolean,
        message: string,
        payload: object,
    }
};

interface SignupRequest {

}

const signup = (req: Request<{ email: string }>, res: Response) => {

    const user = new User();
    let email: string;
    email = req.body.email;




    const payload: object = {

    };

    return res.send(payload);
};

export default { signup };