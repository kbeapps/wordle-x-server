import router from '../../src/routes';
import request from 'supertest';
import db from '../../src/models';
import Notification, { INotification } from '../../src/models/notification.model';
import User, { IUser } from '../../src/models/user.model';

const dbUrl: string = process.env.LOCAL_DB_URL || '';
const source: string = 'notification tests';

let testUser: IUser = new User({
  email: 'notificationmidtestuser@test.com',
  password: '123456',
  username: 'notificationmidtestuser',
});
let testNotification: INotification = new Notification({
  message: 'test message',
});
let deleteNotificationSuccessful: boolean = false;

describe('Notification Routes', () => {
  beforeAll(async () => {
    try {
      await db.mongoose.connect(dbUrl);
    } catch (err) {
      console.log(`Error in ${source} setup: `, err);
    }
  });

  describe('POST /notification/create', () => {
    const route = '/notification/create';
    describe('given a userId & message', () => {
      it('should respond with status 200', async () => {
        const res = await request(router).post(route).send({
          message: testNotification.message,
          userId: testUser._id,
        });
        expect(res.statusCode).toBe(200);
        if (res && res.statusCode === 200) {
          testNotification = (await Notification.findOne({
            userId: testUser._id,
          })) as INotification;
        }
      });
    });

    describe('something is missing', () => {
      it('should respond with status 400', async () => {
        const res = await request(router).post(route).send({
          _id: testNotification._id,
        });
        expect(res.statusCode).toBe(400);
      });
    });
  });

  describe('GET /notification/getall', () => {
    const route = '/notification/getall';

    describe('given a key of userId & value of userId in params', () => {
      it('should respond with status 200', async () => {
        const res = await request(router).get(`${route}/userId/${testUser._id}`).send();
        expect(res.statusCode).toBe(200);
      });
    });

    describe('missing params', () => {
      it('should respond with status 404', async () => {
        const res = await request(router).get(route).send();
        expect(res.statusCode).toBe(404);
      });
    });
  });

  describe('DELETE /notification/delete', () => {
    const route = '/notification/remove';
    describe('given a userId in params', () => {
      it('should respond with status 200', async () => {
        const res = await request(router).delete(`${route}/${testNotification._id}`).send();
        expect(res.statusCode).toBe(200);
        if (res) {
          deleteNotificationSuccessful = true;
        }
      });
    });

    describe('missing params', () => {
      it('should respond with status 404', async () => {
        const res = await request(router).delete(route).send();
        expect(res.statusCode).toBe(404);
      });
    });
  });

  afterAll(async () => {
    try {
      if (!deleteNotificationSuccessful) {
        await Notification.findByIdAndDelete(testNotification._id);
      }
      await db.mongoose.connection.close();
    } catch (err) {
      console.log(`Error in ${source} teardown: `, err);
    } finally {
      await db.mongoose.connection.close();
    }
  });
});
