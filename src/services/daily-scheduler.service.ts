import axios from 'axios';
import * as dotenv from 'dotenv';
import gameController from '../controllers/game.controller';
import Game, { IGame } from '../models/game.model';
import userController from '../controllers/user.controller';
import User, { IUser } from '../models/user.model';
import utils from '../utils';
import { CronJob } from 'cron';

dotenv.config();

const source: string = 'schedulerService';
let status: number = 200;
let game: IGame = new Game();
let dailyOwnerId: string = process.env.ADMIN_ID || '';
let users: IUser[] = [];
let players: string[] = [];

export class DailyScheduler {
	cronJob: CronJob;

	constructor() {
		this.cronJob = new CronJob('0 0 0 * * *', async () => {
			try {
				console.log('DAILY WAS MAINTAINED');
				await this.maintainDaily();
			} catch (error) {
				utils.errHandler(source, String(error));
			}
		});

		if (!this.cronJob.running) {
			this.cronJob.start();
		}
	}

	maintainDaily = async (): Promise<void> => {
		try {
			const mainDailyGame = await gameController.get({ name: 'main daily' });

			// populate daily owner from .env
			if (!mainDailyGame) {
				players = (await this.getAllPlayers()) as string[];

				game = (await gameController.create(
					'main daily',
					String(dailyOwnerId),
					players,
					[],
					'daily',
					'none',
					'5'
				)) as IGame;

				userController.addDailyToAllUsers(String(game._id));
			}

			const newWord = await this.getRandomWord();
			game.wordHistory.push(newWord);

			await gameController.update(String(game._id), {
				wordHistory: game.wordHistory,
			});
		} catch (error) {
			status = 500;
			utils.errHandler(source, String(error));
		}
	};

	getAllPlayers = async (): Promise<string[] | void> => {
		try {
			users = await userController.getAll();
			return users.map((user: IUser) => String(user._id));
		} catch (error) {
			status = 500;
			utils.errHandler(source, String(error));
		}
	};

	getRandomWord = async () => {
		return axios.get('http://api.datamuse.com/words?sp=?????&max=50').then(
			(res) =>
				res.data.map((wordObject: { word: string | string[] }) => {
					if (!wordObject.word.includes(' ')) {
						return wordObject.word;
					}
				})[Math.floor(Math.random() * 40)]
		);
	};
}
