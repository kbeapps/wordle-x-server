import { Response, Request } from 'express';
import User from '../models/user.model';

// Figure out search criteria to pass in instead of Stuff
const get = async (key: string, value: string) => {
    interface IQuery {
        [key: string]: string
    }

    let query: IQuery = {};
    query[key] = value;

    try {
    return await User.findOne(query);
    } catch(error) {
        console.log(error);
    }
};


const create = async (email: string, password: string, username: string) => {
        const user = new User({
            email: email,
            password: password,
            username: username
        });
    
    try {
        return await user.save();
    } catch(error) {
        console.log(error);
    }
  
};


const update = async (req: Request, res: Response) => {

};

const remove = async (req: Request, res: Response) => {

};

export default {
    create, get
};