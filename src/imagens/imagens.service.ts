import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService) { }

    async addImages(imovelId: number, imageUrls: string[]) {
        const entries = imageUrls.map(url => {
            return { imovelId, url };
        });
        await this.prisma.image.createMany({
            data: entries
        });
    }

    async getImagesByImovelId(imovelId: number) {
        const images = await this.prisma.image.findMany({
            where: { imovelId },
        });

        if (!images || images.length === 0) {
            throw new NotFoundException(`No images found for Imóvel with ID ${imovelId}`);
        }
        return images;
    }

    async deleteImage(id: number) {
        try {
            return await this.prisma.image.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }
    }
}
