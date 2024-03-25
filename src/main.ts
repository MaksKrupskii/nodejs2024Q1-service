import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const pathToFile = join(__dirname, '../doc/api.yaml');
  const doc = await readFile(pathToFile, 'utf-8');
  SwaggerModule.setup('doc', app, parse(doc));
  await app.listen(4000);
}
bootstrap();
