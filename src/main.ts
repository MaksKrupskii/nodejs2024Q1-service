import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'path';
import { Logger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  process.on('uncaughtException', (err) => {
    logger.error(`Caught Exception - ${err.message}`);
    process.exit(1);
  });
  process.on('unhandledRejection', (reason) => {
    logger.warn(`Rejection at promise - ${reason}`);
  });
  app.useGlobalPipes(new ValidationPipe());
  const pathToFile = join(__dirname, '../doc/api.yaml');
  const doc = await readFile(pathToFile, 'utf-8');
  SwaggerModule.setup('doc', app, parse(doc));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
