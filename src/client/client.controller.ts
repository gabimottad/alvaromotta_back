import { Controller, Post, Body, Get, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from './client.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    create(@Body() createClientDto: ClientDTO) {
        return this.clientService.create(createClientDto);
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

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string) {
        return this.clientService.delete(Number(id));
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateClientDto: ClientDTO) {
        return this.clientService.update(Number(id), updateClientDto);
    }
}
