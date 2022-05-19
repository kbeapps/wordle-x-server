import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface INotification {
    userId: string,
    message: string
};

const NotificationSchema = new Schema<INotification>({
    userId: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;