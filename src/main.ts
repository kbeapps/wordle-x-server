import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import db from './db/db.model';

dotenv.config();

async function bootstrap() {
  try {
    const connected = await db.mongoose.connect(db.url ? db.url : '');

    if (connected) {
      console.log('Database connection successful.');
    }
  } catch (error) {
    console.log('Server errror');
    process.exit();
  }

  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Connection successful. Port: ${port}`);
  });
}
bootstrap();
