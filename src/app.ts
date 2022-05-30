import * as dotenv from 'dotenv';
import router from './routes/index';
import db from './models';
// TESTING REMOVE:
import controller from './controllers/user.controller';

const initServer = async () => {
    dotenv.config();

    try {
        const connected = await db.mongoose
            .connect(db.url);

        if (connected) {
            console.log('Database connection successful.');
        };
        // TESTING REMOVE:
        // const test = await controller.remove('628ebd2b3f7971736fce97bb');
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