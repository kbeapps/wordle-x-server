import * as dotenv from 'dotenv';
import router from './routes/index';
import db from './models';
require('dotenv').config();

const initServer = async () => {

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

    const port = process.env.PORT || 3000;

    router.listen(port, () => {
        console.log(`Connection successful.  Port: ${port}`);
    });


};

initServer();