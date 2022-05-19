import { NextFunction, Request, Response } from 'express';

const signup = (req: Request, res: Response, next: NextFunction) => {
    console.log('in signup validator');
    next();
};


export {
    signup
};