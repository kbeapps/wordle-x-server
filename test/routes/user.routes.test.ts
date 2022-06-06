const router = require('../../src/routes'),
    request = require('supertest');
import db from '../../src/models';
import User, { IUser } from '../../src/models/user.model';

const source: string = 'user tests';
let testUser: IUser = new User({
    email: 'usermidtest@test.com',
    username: 'usermidtest',
    password: 'test123'
}),
    deleteUserSuccessful: boolean = false;

describe('User Routes', () => {
    beforeAll(async () => {
        try {
            await db.mongoose.connect(db.url);
            await request(router).post('/auth/signup').send({
                email: testUser.email,
                username: testUser.username,
                password: testUser.password
            });
            testUser = await User.findOne({ email: testUser.email }) as IUser;
        } catch (err) {
            console.log(`Error in ${source} setup: `, err);
        }
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

    describe('PATCH /user/update', () => {
        const route = '/user/update';

        describe('Given a username and User ID', () => {
            test('Should respond with status 200', async () => {
                const res = await request(router).patch(route).send({
                    _id: testUser._id,
                    username: 'updatedUsername'
                });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('Missing information', () => {
            test('Should respond with status 400', async () => {
                const res = await request(router).patch(route).send({
                    _id: testUser._id
                });
                expect(res.statusCode).toBe(400);
            });
        });
    });

    describe('DELETE /user/remove', () => {
        const route = '/user/remove';

        describe('Given a User ID in params', () => {
            test('Should respond with status 200', async () => {
                const res = await request(router).delete(`${route}/${testUser._id}`).send();
                expect(res.statusCode).toBe(200);
                if (res && res.statusCode === 200) {
                    deleteUserSuccessful = true;
                }
            });
        });

        describe('Missing Params', () => {
            test('Should respond with status 404', async () => {
                const res = await request(router).delete(route).send();
                expect(res.statusCode).toBe(404);
            });
        });
    });

    afterAll(async () => {
        try {
            if (!deleteUserSuccessful) {
                await User.deleteOne({ email: testUser.email });
            }
        } catch (err) {
            console.log(`Error in ${source} teardown: `, err);
        } finally {
            await db.mongoose.connection.close();
        }
    });
});