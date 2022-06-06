const router = require('../../src/routes'),
    request = require('supertest');
import db from '../../src/models';
import User, { IUser } from '../../src/models/user.model';

const source: string = 'auth tests',
    testUser: IUser = new User({
        email: 'test@test.com',
        username: 'testUser',
        password: 'test123'
    });

describe('Auth middleware tests:', () => {
    beforeAll(async () => {
        try {
            await db.mongoose.connect(db.url);
        } catch (err) {
            console.log(`Error in ${source} setup: `, err);
        }
    });

    describe('POST /auth/signup', () => {
        describe('given a username, email & password', () => {
            test('should respond with status 200', async () => {
                const res = await request(router).post('/auth/signup').send({
                    email: testUser.email,
                    username: testUser.username,
                    password: testUser.password
                });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('something is missing', () => {
            test('should respond with status 400', async () => {
                const wrongUser = {
                    email: testUser.email,
                    username: testUser.username
                };
                const res = await request(router).post('/auth/signup').send(wrongUser);
                expect(res.statusCode).toBe(400);
            });
        });
    });

    describe('POST /auth/signin', () => {
        describe('given a email & password', () => {
            test('should respond with status 200', async () => {
                const res = await request(router).get('/auth/signin').send({
                    email: testUser.email,
                    password: testUser.password
                });
                console.log('res: ', res.statusCode);
                expect(res.statusCode).toBe(200);
            });
        });

        describe('given a username & password', () => {
            test('should respond with status 200', async () => {
                const res = await request(router).get('/auth/signin').send({
                    username: testUser.username,
                    password: testUser.password
                });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('something is missing', () => {
            test('should respond with status 400', async () => {
                const res = await request(router).get('/auth/signin').send({
                    username: testUser.password
                });
                expect(res.statusCode).toBe(400);
            });
        });
    });

    afterAll(async () => {
        try {
            await User.deleteOne({ email: 'test@test.com' });
        } catch (err) {
            console.log(`Error in ${source} teardown: `, err);
        } finally {
            await db.mongoose.connection.close();
        }
    });


});