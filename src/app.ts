import * as dotenv from 'dotenv';

dotenv.config();

import router from './routes/index';

const port = process.env.PORT || 3000;

router.listen(process.env.PORT || 3000, () => {
    console.log(`Connection successful.  Port: ${port}`);
});