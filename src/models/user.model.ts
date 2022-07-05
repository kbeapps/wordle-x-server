import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
	email: string;
	username: string;
	password: string;
	avatar?: string;
	games?: string[];
	friends?: string[];
	groups?: string[];
	_id?: Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		username: {
			type: String,
			required: true,
			unique: true,
			minLength: 5,
			maxLength: 16,
		},
		password: { type: String, required: true, minLength: 5 },
		avatar: String,
		games: Array,
		friends: Array,
		groups: Array,
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
