import { Request, Response } from 'express';

const signup = (req: Request<{ email: string }>, res: Response) => {

    const email: string = req.body.email;

    console.log('email: ', email);

    return res.send('test: ' + email);
};

export default { signup };