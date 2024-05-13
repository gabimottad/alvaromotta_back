import { Controller, Post, Get, Delete, Param, BadRequestException, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { ImageService } from './imagens.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Post(':imovelId')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                callback(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    async addImages(@Param('imovelId') imovelId: number, @UploadedFiles() images: Express.Multer.File[]) {
        if (!images || images.length === 0) {
            throw new BadRequestException('Image files are required');
        }
        const imageUrls = images.map(image => `/uploads/${image.filename}`);
        return this.imageService.addImages(imovelId, imageUrls);
    }

    @Get(':imovelId')
    async getImages(@Param('imovelId') imovelId: number) {
        return this.imageService.getImagesByImovelId(imovelId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteImage(@Param('id') id: number) {
        return this.imageService.deleteImage(id);
    }
}
