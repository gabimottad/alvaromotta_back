import { Controller, Post, Body, Get, NotFoundException, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { ImoveisDTO } from './imoveis.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('imoveis')
export class ImoveisController {
    constructor(private readonly imoveisService: ImoveisService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createImoveisDto: ImoveisDTO) {
        const createdImovel = await this.imoveisService.create(createImoveisDto);
        return createdImovel;
    }

    @Get()
    findAll() {
        return this.imoveisService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        const imovel = await this.imoveisService.findById(id);
        if (!imovel) {
            throw new NotFoundException(`Imóvel com ID ${id} não encontrado.`);
        }
        return imovel;
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: number, @Body() updateImovelDto: ImoveisDTO) {
        return this.imoveisService.updateById(id, updateImovelDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number) {
        const result = await this.imoveisService.deleteById(id);
        if (!result) {
            throw new NotFoundException(`Imóvel com ID ${id} não encontrado.`);
        }
        return { message: 'Imóvel deletado com sucesso.' };
    }
}
