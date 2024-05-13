import { Module } from '@nestjs/common';
import { ImageService } from './imagens.service';
import { ImageController } from './imagens.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImagensModule { }
