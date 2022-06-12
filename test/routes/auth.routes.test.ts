import router from '../../src/routes';
import request from 'supertest';
import db from '../../src/models';
import User, { IUser } from '../../src/models/user.model';

const dbUrl: string = process.env.LOCAL_DB_URL || '';
const source: string = 'auth tests',
  testUser: IUser = new User({
    email: 'test@test.com',
    username: 'testUser',
    password: 'test123',
  });

describe('Auth Routes', () => {
  beforeAll(async () => {
    try {
      await db.mongoose.connect(dbUrl);
    } catch (err) {
      console.log(`Error in ${source} setup: `, err);
    }
  });

  describe('POST /auth/signup', () => {
    describe('given a username, email & password', () => {
      it('should respond with status 200', async () => {
        const res = await request(router).post('/auth/signup').send({
          email: testUser.email,
          username: testUser.username,
          password: testUser.password,
        });
        expect(res.statusCode).toBe(200);
      });
    });

    describe('something is missing', () => {
      it('should respond with status 400', async () => {
        const wrongUser = {
          email: testUser.email,
          username: testUser.username,
        };
        const res = await request(router).post('/auth/signup').send(wrongUser);
        expect(res.statusCode).toBe(400);
      });
    });
  });

  describe('POST /auth/signin', () => {
    describe('given a email & password', () => {
      it('should respond with status 200', async () => {
        const res = await request(router).get('/auth/signin').send({
          email: testUser.email,
          password: testUser.password,
        });
        expect(res.statusCode).toBe(200);
      });
    });

    describe('given a username & password', () => {
      it('should respond with status 200', async () => {
        const res = await request(router).get('/auth/signin').send({
          username: testUser.username,
          password: testUser.password,
        });
        expect(res.statusCode).toBe(200);
      });
    });

    describe('something is missing', () => {
      it('should respond with status 400', async () => {
        const res = await request(router).get('/auth/signin').send({
          username: testUser.password,
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
