const router = require('../../src/routes'),
    request = require('supertest');
import db from '../../src/models';
import Group, { IGroup } from '../../src/models/group.model';
import User, { IUser } from '../../src/models/user.model';

let testUser: IUser = new User({
    email: 'groupmidtestuser@test.com',
    username: 'groupmidtestuser',
    password: 'test123'
}),
    testGroup: IGroup = new Group({
        groupName: 'Test Group Name',
        members: []
    });

const source: string = 'group tests';

describe('Group middleware', () => {
    beforeAll(async () => {
        try {
            await db.mongoose.connect(db.url);
            await request(router).post('/auth/signup').send({
                email: testUser.email,
                username: testUser.username,
                password: testUser.password
            });
            testUser = await User.findOne({ email: testUser.email }) as IUser;
            testGroup.members.push(String(testUser._id));
        } catch (err) {
            console.log(`Error in ${source} setup: `, err);
        }
    });

    describe('POST /group/create', () => {
        const route = '/group/create';

        describe('Given a Group Name, OwnerId, and array of Member IDs', () => {
            test('Should respond with status 200', async () => {
                const res = await request(router).post(route).send({
                    groupName: testGroup.groupName,
                    ownerId: testUser._id,
                    members: testGroup.members
                });
                expect(res.statusCode).toBe(200);
                if (res && res.statusCode === 200) {
                    testGroup = await Group.findOne({ ownerId: testUser._id }) as IGroup;
                };
            });
        });

        describe('Missing information', () => {
            test('Should respond with status 400', async () => {
                const wrongGroup = {
                    groupName: 'wrong name'
                };
                const res = await request(router).post(route).send(wrongGroup);
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

    describe('PATCH /group/update', () => {
        const route = '/group/update';

        describe('Given an _id and group name', () => {
            test('Should respond with status 200', async () => {
                const res = await request(router).patch(route).send({
                    _id: testUser._id,
                    groupName: 'updated group name'
                });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('Given a groupId, members', () => {
            test('Should respond with status 200', async () => {
                const res = await request(router).patch(route).send({
                    _id: testGroup._id,
                    members: testGroup.members
                });
                expect(res.statusCode).toBe(200);
            });
        });

        describe('Missing information', () => {
            test('Should respond with status 400', async () => {
                const res = await request(router).patch(route).send({
                    _id: testGroup._id
                });
                expect(res.statusCode).toBe(400);
            });
        });
    });

    // describe('DELETE /group/remove', () => {
    //     const route = '/group/remove';

    //     describe('Given a Group ID in Params', () => {
    //         test('Should respond with status 200', async () => {
    //             const res = await request(router).post(`${route}/${testGroup._id}`).send();
    //             expect(res.statusCode).toBe(200);
    //         });
    //     });

    //     describe('Missing information', () => {
    //         test('Should respond with status 400', async () => {
    //             const res = await request(router).get(route).send();
    //             expect(res.statusCode).toBe(400);
    //         });
    //     });
    // });

    afterAll(async () => {
        try {
            await Group.findByIdAndDelete({ _id: testGroup._id });
            await User.findByIdAndDelete({ _id: testUser._id });
        } catch (err) {
            console.log(`Error in ${source} teardown: `, err);
        } finally {
            await db.mongoose.connection.close();
        }
    });
});