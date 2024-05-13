import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from './client.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    create(@Body() createClienttDto: ClientDTO) {
        return this.clientService.create(createClienttDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.clientService.findAll();
    }
    @Get('count')
    @UseGuards(JwtAuthGuard)
    getCount() {
        return this.clientService.count();
    }
}
