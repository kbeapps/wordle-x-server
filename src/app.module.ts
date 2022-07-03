import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { GroupModule } from './group/group.module';
import { GameModule } from './game/game.module';
import db from './db/db.model';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(db.url ? db.url : ''),
    NotificationModule,
    GroupModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
