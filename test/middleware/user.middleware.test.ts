const router = require('../../src/routes'),
    request = require('supertest');
import db from '../../src/models';
import User from '../../src/models/user.model';

let testUser = {
    _id: '',
    email: 'usermidtest@test.com',
    username: 'usermidtest',
    password: 'test123'
};

beforeAll(async () => {
    await db.mongoose.connect(db.url);
    testUser = await request(router).post('/auth/signin').send({
        email: testUser.email,
        username: testUser.username,
        password: testUser.password
    });
});

describe('GET /user/get', () => {
    const route = '/user/get';

    describe('Given a User ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send({ _id: testUser._id });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Given a User Email', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send({ email: testUser.email });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Given a Username', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send({ username: testUser.username });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send();
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('POST /user/update', () => {
    const route = '/user/update';

    describe('Given a username and User ID', () => {
        test('Should respond with status 200', async () => {
            testUser.username = 'usermidtestChanged';

            const res = await request(router).post(route).send({ _id: testUser._id, username: testUser.username });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send({ _id: testUser._id });
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('DELETE /user/remove', () => {
    const route = '/user/remove';

    describe('Given a User ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).post(`${route}/${testUser._id}`).send();
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send();
            expect(res.statusCode).toBe(400);
        });
    });
});

afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
    await db.mongoose.connection.close();
});