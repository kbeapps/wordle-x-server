import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IGroup {
    groupName: string;
    members: string[];
};

const GroupSchema = new Schema<IGroup>({
    groupName: { type: String, required: true, minLength: 5, maxLength: 16 },
    members: { type: [String], required: true, min: 2, max: 20 }
}, { timestamps: true });

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;