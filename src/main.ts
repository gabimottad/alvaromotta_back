import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('rootCA.key'),
    cert: fs.readFileSync('rootCA.pem'),
    passphrase: 'oseomp23',
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const APP_HOSTNAME = 'api-imobiliaria'; 

  app.enableCors({
    origin: 'http://localhost:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  const PORT = process.env.PORT || 3005;
  await app.listen(PORT);
  console.log(`Server running on https://${APP_HOSTNAME}:${PORT}`);
}

bootstrap();
