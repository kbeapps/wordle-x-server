import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schema/notification.schema';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('create')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get('/getall/:key/:value')
  findAll(@Param() query: Notification) {
    return this.notificationService.findAll();
  }

  @Delete('/remove/:_id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }

  @Delete('/removeall/:userId')
  removeAll(@Param('userId') userId: string) {
    return this.notificationService.remove(+userId);
  }
}
