import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { ClientDTO } from './client.dto';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) { }

    async create(createClientDto: ClientDTO) {
        return this.prisma.client.create({
            data: createClientDto,
        });
    }

    async findAll() {
        return this.prisma.client.findMany();
    }

    async count() {
        return this.prisma.client.count();
    }

    async delete(id: number) {
        return this.prisma.client.delete({
            where: { id },
        });
    }

    async update(id: number, updateClientDto: ClientDTO) {
        return this.prisma.client.update({
            where: { id },
            data: updateClientDto,
        });
    }
}
