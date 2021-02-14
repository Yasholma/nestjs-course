import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { DEVELOPMENT } from './utils/constants';

async function bootstrap() {
  const serverConfig: { port: number } = config.get('server');
  const logger = new Logger('bootstrap');

  const PORT = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === DEVELOPMENT) {
    app.enableCors();
  }

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
