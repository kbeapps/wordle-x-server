const { signup } = require('../../src/middleware/auth.middleware');
const router = require('../../src/routes');

const request = require('supertest');

// test('will return user', () => {
//     const req = new Request({
//         body: { email: 'test', username: 'test', password: 'test' }
//     });
//     expect(signup(req)).toBe('test');
// });

describe('POST /auth/signup', () => {
    jest.setTimeout(30000);
    describe('given a username, email & password', () => {
        // should check for duplicate username / email
        // should create new user in database
        test('should respond with status 200', async () => {
            const res = await request(router).post('/auth/signup').send({
                email: 'test@test.com',
                username: 'testUser',
                password: 'test123'
            });
            expect(res.statusCode).toBe(200);
        });

    });

    describe('something is missing', () => {
        // should respond with status 400

    });

});