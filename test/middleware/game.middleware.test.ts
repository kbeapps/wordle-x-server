const router = require('../../src/routes');
const request = require('supertest');
import db from '../../src/models';
import Game from '../../src/models/game.model';
import User from '../../src/models/user.model';

let testUser = {
    _id: '',
    email: 'gameMidTestUser@test.com',
    password: '123456',
    username: 'gameMidTestUser'
};

let testGame = {
    _id: '',
    name: 'test game name',
    players: [''],
    wordHistory: 'test',
    type: 'custom',
    winCondition: 'points',
    wordSize: 4,
};

beforeAll(async () => {
    await db.mongoose.connect(db.url);
    testUser = await request(router).post('/user/create').send(testUser);
    testGame.players = [testUser._id];
});

describe('POST /game/create', () => {
    const route = '/game/create';
    describe('given name, players, wordHistory, type, winCondition & wordSize', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(route).send(testGame);
            expect(res.statusCode).toBe(200);
            if (res) {
                testGame = res;
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
    describe('given a gameId', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(route).send({ _id: testGame._id });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('something is missing', () => {
        test('should respond with status 400', async () => {
            const res = await request(router).post(route).send();
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('PATCH /game/update', () => {
    const route = '/game/get';
    describe('given a game ID & object with key to update', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(route).send({ _id: testGame._id, name: 'updated test name' });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('something is missing', () => {
        test('should respond with status 400', async () => {
            const res = await request(router).post(route).send({ _id: testGame._id });
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('DELETE /game/delete', () => {
    const route = '/game/delete';
    describe('given a gameId in Params', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(`${route}/${testGame._id}`).send();
            expect(res.statusCode).toBe(200);
        });
    });

    describe('something is missing', () => {
        test('should respond with status 400', async () => {
            const res = await request(router).post(route).send();
            expect(res.statusCode).toBe(400);
        });
    });
});

afterAll(async () => {
    await Game.deleteOne({ _id: testGame._id });
    await User.deleteOne({ _id: testUser._id });
    await db.mongoose.connection.close();
});
