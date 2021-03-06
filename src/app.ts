import * as dotenv from 'dotenv';
import router from './routes/index';
import utils from './utils';
import db from './models';
import { DailyScheduler } from './services/daily-scheduler.service';

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

	const port = process.env.PORT || 3000;

	router.listen(port, () => {
		console.log(`Connection successful.  Port: ${port}`);
	});

	new DailyScheduler();
};

initServer();
