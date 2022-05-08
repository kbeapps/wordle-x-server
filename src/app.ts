import * as dotenv from 'dotenv';
import router from './routes/index';
import db from './models';

const initServer = async () => {
    dotenv.config();

    const port = process.env.PORT || 3000;

    router.listen(process.env.PORT || 3000, () => {
        console.log(`Connection successful.  Port: ${port}`);
    });

    try {
        const connected = await db.mongoose
            .connect(db.url);

        if (connected) {
            console.log('Database connection successful.');
        };
    } catch (err) {
        console.log('error: ', err);
        process.exit();
    };
};

initServer();