import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  removeAll(id: number) {
    return `This action removes a #${id} notification`;
  }
}
