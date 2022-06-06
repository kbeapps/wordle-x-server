import mongoose, { Schema, Types } from 'mongoose';

export interface IGroup {
    ownerId: string;
    groupName: string;
    members: string[];
    _id?: Types.ObjectId;
};

const GroupSchema = new Schema<IGroup>({
    ownerId: { type: String, required: true },
    groupName: { type: String, required: true, minLength: 5, maxLength: 16 },
    members: { type: [String], required: true, min: 2, max: 20 }
}, { timestamps: true });

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;