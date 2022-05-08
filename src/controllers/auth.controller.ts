import { BaseController } from './base.controller';
import { Response, Request } from 'express';
import { User } from '../models/user.model';
import { UserDoc } from '../interfaces/user.interface';

export class AuthController extends BaseController {
    constructor() {
        super(new User());
    }

    createFunction(req: Request, res: Response) {
        // Add some conditional logic...

        const user = {
            email: 'test@test.com',
            username: 'test1241',
            password: '23fsdfsdf'
        };

        this.create(res, req.body);
    }

    async signup(req: Request, res: Response) {
        console.log('signing up');

        const user = {
            email: 'test@test.com',
            username: 'test1241',
            password: '23fsdfsdf'
        };

        this.model.email = 'test@test.com';



        // this.create(res, user);

        return res.send(this.model);

    };

    // async putFunction(req: Request, res: Response) {
    //     try {
    //         const doc = await this.model.findById<UserDoc>(req.params.id);
    //         doc.email = req.body.email;
    //         // doc.set('details.email', req.body.details.name);
    //         await doc.save();
    //         this.jsonRes(doc, res);
    //     } catch (e) {
    //         this.errRes(e, res, 'Failed');
    //     }
    // }
}