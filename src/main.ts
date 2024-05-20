import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


  const PORT = process.env.PORT || 3005;
  await app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
}

bootstrap();


