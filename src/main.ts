import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('Buxoro example')
  .setDescription('The Buxoro API description')
  .setVersion('1.0')
  .addTag('Buxoro')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  const uploadDir = './uploads';
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  const logger = new Logger('Bootstrap');
  logger.log('🚀 Server ishga tushdi!');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
