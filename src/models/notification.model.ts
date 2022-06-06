import mongoose, { Schema, Types } from 'mongoose';

export interface INotification {
    userId: string,
    message: string,
    _id?: Types.ObjectId;
};

const NotificationSchema = new Schema<INotification>({
    userId: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;