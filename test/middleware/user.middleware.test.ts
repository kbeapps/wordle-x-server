const router = require('../../src/routes');
const request = require('supertest');
import { Hmac } from 'crypto';
import db from '../../src/models';
import User from '../../src/models/user.model';

let createdUser = {
    _id: null,
    email: null,
    username: null
};

const testUser = {
    email: 'usermidtest@test.com',
    username: 'usermidtest',
    password: 'test123'
};

beforeAll(async () => {
    await db.mongoose.connect(db.url);
    createdUser = await request(router).post('/auth/signin').send(testUser);
});

describe('GET /user/get', () => {
    const route = '/user/get';

    describe('Given a User ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send(createdUser._id);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Given a User Email', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send(createdUser.email);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Given a Username', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send(createdUser.username);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send(testUser);
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('POST /user/update', () => {
    const route = '/user/update';

    describe('Given a username', () => {
        test('Should respond with status 200', async () => {
            testUser.username = 'usermidtestChanged';

            const res = await request(router).post(route).send(testUser.username);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send(testUser);
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('DELETE /user/remove', () => {
    const route = '/user/remove';

    describe('Given a User ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).post(route).send(createdUser._id);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send(testUser);
            expect(res.statusCode).toBe(400);
        });
    });
});

afterAll(async () => {
    await User.deleteOne({ email: 'usermidtest@test.com' });
    await db.mongoose.connection.close();
});