const router = require('../../src/routes');
const request = require('supertest');
import db from '../../src/models';
import User from '../../src/models/user.model';

const testUser = {
    email: 'test@test.com',
    username: 'testUser',
    password: 'test123'
};

beforeAll(async () => {
    await db.mongoose.connect(db.url);
});

describe('POST /auth/signup', () => {
    describe('given a username, email & password', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post('/auth/signup').send(testUser);
            expect(res.statusCode).toBe(200);

        });
    });

    describe('something is missing', () => {
        test('should respond with status 400', async () => {
            const res = await request(router).post('/auth/signup').send({
                email: testUser.email,
                username: testUser.username
            });
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('POST /auth/signin', () => {
    describe('given a email & password', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post('/auth/signin').send({
                email: testUser.email,
                password: testUser.password
            });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('given a username & password', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post('/auth/signin').send({
                username: testUser.username,
                password: testUser.password
            });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('something is missing', () => {
        test('should respond with status 400', async () => {
            const res = await request(router).post('/auth/signin').send({
                username: testUser.password
            });
            expect(res.statusCode).toBe(400);
        });
    });
});

afterAll(async () => {
    await User.deleteOne({ email: 'test@test.com' });
    await db.mongoose.connection.close();
});
