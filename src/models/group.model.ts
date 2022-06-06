import mongoose, { Schema, Types } from 'mongoose';

export interface IGroup {
    ownerId: Types.ObjectId;
    groupName: string;
    members: string[];
    _id?: Types.ObjectId;
};

const GroupSchema = new Schema<IGroup>({
    ownerId: { type: Schema.Types.ObjectId, required: true },
    groupName: { type: String, required: true, minLength: 5, maxLength: 16 },
    members: { type: [String], required: true, min: 2, max: 20 }
}, { timestamps: true });

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;