import { Response } from 'express';

const errHandler = (source: string, err: object|string) => {
    const error = {
        source: source,
        error: err
    };

    console.log(error);

};

export { errHandler };