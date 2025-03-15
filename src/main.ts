import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, '0.0.0.0');
  console.log(`Server running on http://localhost:${PORT}`);
}

bootstrap();
