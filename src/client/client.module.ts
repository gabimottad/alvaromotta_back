import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { PrismaService } from '../database/PrismaService';
import { ClientService } from './client.service';

@Module({
    controllers: [ClientController],
    providers: [ClientService, PrismaService],
})
export class ClientModule { }
