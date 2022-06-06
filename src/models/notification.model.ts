import mongoose, { Schema, Types } from 'mongoose';

export interface INotification {
    userId: Types.ObjectId,
    message: string,
    _id?: Types.ObjectId;
};

const NotificationSchema = new Schema<INotification>({
    userId: { type: Schema.Types.ObjectId, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;