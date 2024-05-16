import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { ImoveisDTO } from './imoveis.dto';

@Injectable()
export class ImoveisService {
    constructor(private prisma: PrismaService) { }

    async create(createImoveisDto: ImoveisDTO) {
        const newData = {
            ...createImoveisDto,
            createdAt: new Date(),
            images: {
                create: createImoveisDto.images
            }
        };
        return this.prisma.imoveis.create({
            data: newData
        });
    }

    async findAll() {
        return this.prisma.imoveis.findMany({
            include: { images: true }
        });
    }

    async findById(id: number) {
        const imovel = await this.prisma.imoveis.findUnique({
            where: { id },
            include: { images: true }
        });
        if (!imovel) {
            throw new NotFoundException(`Imóvel com ID ${id} não encontrado.`);
        }
        return imovel;
    }

    async updateById(id: number, updateData: Partial<ImoveisDTO>) {
        try {
            const newData = {
                ...updateData,
                images: {
                    update: updateData.images.map(image => ({
                        where: { id: image.id },
                        data: {

                        }
                    }))
                }
            };
            return await this.prisma.imoveis.update({
                where: { id },
                data: newData,
                include: { images: true }
            });
        } catch (error) {
            throw new NotFoundException(`Não foi possível atualizar o imóvel com ID ${id}.`);
        }
    }

    async deleteById(id: number) {
        try {
            await this.prisma.image.deleteMany({
                where: { imovelId: id },
            });
            return await this.prisma.imoveis.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Não foi possível deletar o imóvel com ID ${id}.`);
        }
    }
}
