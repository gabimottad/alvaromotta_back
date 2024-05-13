// src/contact/contact.module.ts
import { Module } from '@nestjs/common';
import { ImoveisController } from './imoveis.controller';
import { ImoveisService } from './imoveis.service';
import { PrismaService } from '../database/PrismaService';

@Module({
    controllers: [ImoveisController],
    providers: [ImoveisService, PrismaService],
})
export class ImoveisModule { }
