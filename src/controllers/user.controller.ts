import { Response, Request } from 'express';
import User from '../models/user.model';

// Figure out search criteria to pass in instead of Stuff
const get = async (params: object) => {
    return await User.findOne(params);
};


//Complete creation of below functions
const create = async (req: Request, res: Response) => {

};


const update = async (req: Request, res: Response) => {

};

const remove = async (req: Request, res: Response) => {

};