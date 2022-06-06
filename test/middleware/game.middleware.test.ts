const router = require('../../src/routes');
const request = require('supertest');
import db from '../../src/models';
import Game, { IGame } from '../../src/models/game.model';
import User, { IUser } from '../../src/models/user.model';
import { Types } from 'mongoose';

let testUser: IUser = new User({
    email: 'gameMidTestUser@test.com',
    password: '123456',
    username: 'gameMidTestUser'
});

let testGame: IGame = new Game({
    name: 'test game name',
    ownerId: new Types.ObjectId(),
    players: [''],
    wordHistory: ['test'],
    type: 'custom',
    winCondition: 'score',
    wordSize: 4,
});

let deleteGameSuccessful: boolean = true;

describe('game middleware', () => {
    beforeAll(async () => {
        await db.mongoose.connect(db.url);

        await request(router).post('/auth/signup').send({
            email: testUser.email,
            username: testUser.username,
            password: testUser.password
        });

        testUser = await User.findOne({ email: testUser.email }) as IUser;
        testGame.players = [testUser._id ? testUser._id.toString() : ''];
    });

    describe('POST /game/create', () => {
        const route = '/game/create';
        describe('given name, ownerId, players, wordHistory, type, winCondition & wordSize', () => {
            test('should respond with status 200', async () => {
                const createGame = {
                    name: testGame.name,
                    ownerId: testUser._id,
                    players: testGame.players,
                    wordHistory: testGame.wordHistory,
                    type: testGame.type,
                    winCondition: testGame.winCondition,
                    wordSize: testGame.wordSize
                };
                const res = await request(router).post(route).send(createGame);
                expect(res.statusCode).toBe(200);
                if (res) {
                    testGame = await Game.findOne({ ownerId: testUser._id }) as IGame;
                }
            });
        });

        describe('something is missing', () => {
            test('should respond with status 400', async () => {
                const res = await request(router).post(route).send({
                    name: 'game should fail',
                });
                expect(res.statusCode).toBe(400);

            });
        });
    });

    describe('GET /game/get', () => {
        const route = '/game/get';
        describe('given a gameId in params', () => {
            const validRoute = route + `/${testGame._id}`;
            test('should respond with status 200', async () => {
                const res = await request(router).get(validRoute).send({ _id: testGame._id });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('missing params', () => {
            test('should respond with status 404', async () => {
                const res = await request(router).get(route).send();
                expect(res.statusCode).toBe(404);
            });
        });
    });

    describe('PATCH /game/update', () => {
        const route = '/game/update';
        describe('given a game ID & object with key to update', () => {
            test('should respond with status 200', async () => {
                const res = await request(router).patch(route).send({ _id: testGame._id, name: 'updated test name' });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('something is missing', () => {
            test('should respond with status 400', async () => {
                const res = await request(router).patch(route).send({ _id: testGame._id });
                expect(res.statusCode).toBe(400);
            });
        });
    });

    describe('DELETE /game/delete', () => {
        const route = '/game/remove';
        describe('given a gameId in Params', () => {
            test('should respond with status 200', async () => {
                const res = await request(router).delete(`${route}/${testGame._id}`).send();
                if (!res) {
                    deleteGameSuccessful = false;
                }
                expect(res.statusCode).toBe(200);
            });
        });

        describe('missing params', () => {
            test('should respond with status 404', async () => {
                const res = await request(router).delete(route).send();
                expect(res.statusCode).toBe(404);
            });
        });
    });

    afterAll(async () => {
        try {
            if (!deleteGameSuccessful) {
                await Game.findByIdAndDelete(testGame._id);
            }
            if (testUser) {
                await User.findByIdAndDelete(testUser._id);
            }
        } catch (err) {
            console.log('afterAll err in game tests: ', err);
        } finally {
            await db.mongoose.connection.close();
        }
    });
});
