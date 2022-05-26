const router = require('../../src/routes');
const request = require('supertest');
import db from '../../src/models';
import Group from '../../src/models/group.model';
import User from '../../src/models/user.model';

let createdUser = {
    _id: '',
    email: null,
    username: null
};

const testUser = {
    email: 'groupmidtest@test.com',
    username: 'groupmidtest',
    password: 'test123'
};

let createdGroup = {
    _id: null,
    groupName: null,
    members: null
};

const testGroup = {
    groupName: 'testGroup',
    members: ['']
};

beforeAll(async () => {
    const connected = await db.mongoose.connect(db.url);
    createdUser = await request(router).post('/auth/signin').send(testUser);
});

describe('POST /group/create', () => {
    const route = '/group/create';

    describe('Given a Group Name and array of Member IDs', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send(testGroup);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send(testGroup);
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('GET /group/get', () => {
    const route = '/group/get';

    describe('Given a Group ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send(createdGroup._id);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send(createdGroup._id);
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('POST /group/update', () => {
    const route = '/group/update';

    describe('Given a group name', () => {
        test('Should respond with status 200', async () => {
            testGroup.groupName = 'testGroupChanged';
    
            const res = await request(router).post(route).send(testGroup.groupName);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Given a member ID', () => {
        test('Should respond with status 200', async () => {
            testGroup.members.push(createdUser._id);
    
            const res = await request(router).post(route).send(testGroup.members);
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

describe('DELETE /group/remove', () => {
    const route = '/group/remove';

    describe('Given a Group ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).post(route).send(createdGroup._id);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send(createdGroup._id);
            expect(res.statusCode).toBe(400);
        });
    });
});

afterAll(async () => {
    await Group.deleteOne({ _id: createdGroup._id });
    await User.deleteOne({ _id: createdUser._id });
    await db.mongoose.connection.close();
});