import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import db from './db/db.model';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(db.url ? db.url : ''),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
