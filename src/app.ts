import * as dotenv from 'dotenv';
import router from './routes/index';
import db from './models';
// TESTING REMOVE:
import controller from './controllers/notification.controller';

const initServer = async () => {
    dotenv.config();

    try {
        const connected = await db.mongoose
            .connect(db.url);

        if (connected) {
            console.log('Database connection successful.');
        };
        // TESTING REMOVE:
        // const test = await controller.removeAll('lseo58utbloirhgsohg');
        // console.log('\n\ntest: ', test);
    } catch (err) {
        console.log('error: ', err);
        process.exit();
    };

    const port = process.env.PORT || 3000;

    router.listen(port, () => {
        console.log(`Connection successful.  Port: ${port}`);
    });


};

initServer();