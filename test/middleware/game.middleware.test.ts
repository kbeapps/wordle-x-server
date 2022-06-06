const router = require('../../src/routes');
const request = require('supertest');
import db from '../../src/models';
import Game, { IGame } from '../../src/models/game.model';
import User from '../../src/models/user.model';

interface ITestUser {
    _id: string,
    email: string,
    password: string,
    username: string
}
let testUser: ITestUser | null = {
    _id: '',
    email: 'gameMidTestUser@test.com',
    password: '123456',
    username: 'gameMidTestUser'
};

// interface IGame {
//     _id: string,
//     name: string,
//     ownerId: string,
//     username: string
// }

let testGame: IGame = {
    _id: '',
    name: 'test game name',
    ownerId: '',
    players: [''],
    wordHistory: ['test'],
    type: 'custom',
    winCondition: 'score',
    wordSize: 4,
};

let testUserId: string = '';

describe('game middleware', () => {
    beforeAll(async () => {
        await db.mongoose.connect(db.url);
        if (testUser) {
            await request(router).post('/auth/signup').send({
                email: testUser.email,
                username: testUser.username,
                password: testUser.password
            });

            testUser = await User.findOne({ email: testUser.email });
            testUserId = testUser ? testUser._id.toString() : '';
            testGame.ownerId = testUserId;
            testGame.players = [testUserId];
        }

    });

    describe('POST /game/create', () => {
        const route = '/game/create';
        describe('given name, ownerId, players, wordHistory, type, winCondition & wordSize', () => {
            test('should respond with status 200', async () => {
                const createGame = {
                    name: testGame.name,
                    ownerId: testUserId,
                    players: testGame.players,
                    wordHistory: testGame.wordHistory,
                    type: testGame.type,
                    winCondition: testGame.winCondition,
                    wordSize: testGame.wordSize
                };
                const res = await request(router).post(route).send(createGame);
                expect(res.statusCode).toBe(200);
                if (res) {
                    testGame = await Game.findOne({ ownerId: testGame.ownerId });;
                }
            });
        });

        describe('something is missing', () => {
            test('should respond with status 400', async () => {
                const res = await request(router).post(route).send({
                    name: 'test',
                });
                expect(res.statusCode).toBe(400);

            });
        });
    });

    describe('GET /game/get', () => {
        const route = '/game/get';
        describe('given a gameId in params', () => {
            const validRoute = route + `/${testGame._id}`;
            console.log('validRoute: ', validRoute);
            test('should respond with status 200', async () => {
                const res = await request(router).get(validRoute).send({ _id: testGame._id });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('something is missing', () => {
            test('should respond with status 400', async () => {
                const res = await request(router).get(route).send();
                expect(res.statusCode).toBe(400);
            });
        });
    });

    // describe('PATCH /game/update', () => {
    //     const route = '/game/get';
    //     describe('given a game ID & object with key to update', () => {
    //         test('should respond with status 200', async () => {
    //             const res = await request(router).post(route).send({ _id: testGame._id, name: 'updated test name' });
    //             expect(res.statusCode).toBe(200);
    //         });
    //     });

    //     describe('something is missing', () => {
    //         test('should respond with status 400', async () => {
    //             const res = await request(router).post(route).send({ _id: testGame._id });
    //             expect(res.statusCode).toBe(400);
    //         });
    //     });
    // });

    // describe('DELETE /game/delete', () => {
    //     const route = '/game/delete';
    //     describe('given a gameId in Params', () => {
    //         test('should respond with status 200', async () => {
    //             const res = await request(router).post(`${route}/${testGame._id}`).send();
    //             expect(res.statusCode).toBe(200);
    //         });
    //     });

    //     describe('something is missing', () => {
    //         test('should respond with status 400', async () => {
    //             const res = await request(router).post(route).send();
    //             expect(res.statusCode).toBe(400);
    //         });
    //     });
    // });

    afterAll(async () => {
        await Game.findByIdAndDelete(testGame._id);
        await User.findByIdAndDelete(testUserId);
        await db.mongoose.connection.close();
    });

});
