import { Controller, Post, Body, Get, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDTO } from './create-contact.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    create(@Body() createContactDto: ContactDTO) {
        return this.contactService.create(createContactDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.contactService.findAll();
    }

    @Get('count')
    @UseGuards(JwtAuthGuard)
    getCount() {
        return this.contactService.count();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string) {
        return this.contactService.delete(Number(id));
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateContactDto: ContactDTO) {
        return this.contactService.update(Number(id), updateContactDto);
    }
}
