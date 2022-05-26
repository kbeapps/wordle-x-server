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

let testGroup = {
    _id: '',
    groupName: 'testGroup',
    members: ['628ebd2b3f7971736fce97bb']
};

beforeAll(async () => {
    await db.mongoose.connect(db.url);
    createdUser = await request(router).post('/auth/signin').send(testUser);
});

describe('POST /group/create', () => {
    const route = '/group/create';

    describe('Given a Group Name and array of Member IDs', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send({
                groupName: testGroup.groupName,
                members: testGroup.members
            });
            expect(res.statusCode).toBe(200);
            if (res) {
                testGroup = res;
            };
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const wrongGroup = {
                groupName: 'wrong name'
            };
            const res = await request(router).get(route).send(wrongGroup);
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('GET /group/get', () => {
    const route = '/group/get';

    describe('Given a Group ID', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).get(route).send({ _id: testGroup._id });
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

describe('POST /group/update', () => {
    const route = '/group/update';

    describe('Given a group name', () => {
        test('Should respond with status 200', async () => {
            testGroup.groupName = 'testGroupChanged';
            const res = await request(router).post(route).send({ groupName: testGroup.groupName });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Given a groupId, members', () => {
        test('Should respond with status 200', async () => {
            testGroup.members.push(createdUser._id);
            const res = await request(router).post(route).send({ _id: testGroup._id, members: testGroup.members });
            expect(res.statusCode).toBe(200);
        });
    });

    describe('Missing information', () => {
        test('Should respond with status 400', async () => {
            const res = await request(router).get(route).send({ _id: testGroup._id });
            expect(res.statusCode).toBe(400);
        });
    });
});

describe('DELETE /group/remove', () => {
    const route = '/group/remove';

    describe('Given a Group ID in Params', () => {
        test('Should respond with status 200', async () => {
            const res = await request(router).post(`${route}/${testGroup._id}`).send();
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
    await Group.deleteOne({ _id: testGroup._id });
    await User.deleteOne({ _id: testGroup._id });
    await db.mongoose.connection.close();
});