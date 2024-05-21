import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { ContactDTO } from './create-contact.dto';

@Injectable()
export class ContactService {
    constructor(private prisma: PrismaService) { }

    async create(createContactDto: ContactDTO) {
        return this.prisma.contact.create({
            data: createContactDto,
        });
    }

    async findAll() {
        return this.prisma.contact.findMany();
    }

    async count() {
        return this.prisma.contact.count();
    }

    async delete(id: number) {
        return this.prisma.contact.delete({
            where: { id },
        });
    }

    async update(id: number, updateContactDto: ContactDTO) {
        return this.prisma.contact.update({
            where: { id },
            data: updateContactDto,
        });
    }
}
