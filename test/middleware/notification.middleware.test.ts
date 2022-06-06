const router = require('../../src/routes');
const request = require('supertest');
import db from '../../src/models';
import Notification from '../../src/models/notification.model';

let testNotification = {
    _id: null,
    message: 'test message',
};

beforeAll(async () => {
    await db.mongoose.connect(db.url);
});

describe('POST /notification/create', () => {
    const route = '/notification/create';
    describe('given a notificationId & message', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(route).send(testNotification);
            expect(res.statusCode).toBe(200);
            if (res) {
                testNotification._id = res._id;
            }
        });
    });

    describe('something is missing', () => {
        test('should respond with status 400', async () => {
            const res = await request(router).post(route).send({
                _id: testNotification._id,
            });
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('GET /notification/get', () => {
    const route = '/notification/get';
    describe('given a notificationId', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(route).send({ _id: testNotification._id });
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

describe('DELETE /notification/delete', () => {
    const route = '/notification/delete';
    describe('given a notificationId in Params', () => {
        test('should respond with status 200', async () => {
            const res = await request(router).post(`${route}/${testNotification._id}`).send();
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
    await Notification.deleteOne({ _id: '628ebd2b3f7971736fce97bb' });
    await db.mongoose.connection.close();
});
