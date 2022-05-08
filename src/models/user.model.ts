import { Schema } from 'mongoose';

interface User {
    email: string;
    username: string;
    password: string;
    avatar?: string;
    games?: string[],
    friends?: string[],
    groups?: string[],
};

const schema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, minLength: 5, maxLength: 16 },
    avatar: String,
    games: Array,
    friends: Array,
    groups: Array
});

export default schema;