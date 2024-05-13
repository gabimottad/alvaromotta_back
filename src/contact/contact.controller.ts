// src/contact/contact.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
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
}
