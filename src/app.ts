import * as dotenv from 'dotenv';
import router from './routes/index';
import utils from './utils';
import db from './models';

dotenv.config();

const initServer = async () => {
  try {
    const connected = await db.mongoose.connect(db.url ? db.url : '');

    if (connected) {
      console.log('Database connection successful.');
    }
  } catch (err) {
    utils.errHandler('server', String(err));
    process.exit();
  }
  var x = 12;
  const port = process.env.PORT || 3000;

  router.listen(port, () => {
    console.log(`Connection successful.  Port: ${port}`);
  });
};

initServer();
