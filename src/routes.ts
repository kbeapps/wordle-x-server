import { Express, Request, Response, NextFunction } from 'express';

function routes(app: Express) {

    app.get('/', (req: Request, res: Response) => {
        return res.send('Welcome');
    });

    // app.route('/')
    //     .get((req: Request, res: Response) => {
    //         return res.send('GET request');
    //     })
    //     .post((req: Request, res: Response) => {
    //         return res.send('POST request');
    //     })
    //     .put((req: Request, res: Response) => {
    //         return res.send('PUT request');
    //     })
    //     .all((req: Request, res: Response) => {
    //         return res.send('Not GET / POST / PUT request');
    //     });

    // app.post('/api/data', (req: Request, res: Response) => {
    //     console.log(req.body);

    //     return res.sendStatus(200);
    // });

    // app.all('/api/all', (req: Request, res: Response) => {
    //     return res.sendStatus(200);
    // });

    // const middleware = ({ name }: { name: string }) =>
    //     (req: Request, res: Response, next: NextFunction) => {
    //         res.locals.bookId = name;

    //         next();
    //     };

    // app.use(middleware({ name: 'Mike Pancake' }));

    // app.get('/api/books/:bookId/:authorId',
    //     [middleware, handleGetBook]);

    // const throwError = async () => {
    //     throw new Error('Splat.');
    // };

    // app.get('/error', async (req, res) => {
    //     try {
    //         await throwError();
    //         res.sendStatus(200);
    //     } catch (err) {
    //         res.status(400).send('not ok');
    //     };

    // });


}

export default routes;