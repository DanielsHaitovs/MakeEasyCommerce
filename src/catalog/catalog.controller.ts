// src/catalog/catalog.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Catalog } from './entities/catalog.entity';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create catalog',
        description: 'Create (specifically) catalog entity',
    })
    @ApiBody({
        type: CreateCatalogDto,
        description: 'Create Basket',
        required: true,
    })
    async create(@Body() createCatalogDto: CreateCatalogDto): Promise<any> {
        return await this.catalogService.createCatalog({
            createCatalogDto: createCatalogDto,
        });
    }

    @Get()
    async getAllCategories(): Promise<Catalog[]> {
        return this.catalogService.getAllCatalogs();
    }

    @Get(':id')
    async getCatalogById(@Param('id') id: number): Promise<Catalog> {
        return this.catalogService.getCatalogById({ id: id });
    }

    @Put(':id')
    async updateCatalog(
        @Param('id') id: number,
        @Body('name') name: string,
    ): Promise<Catalog> {
        return this.catalogService.updateCatalog(id, name);
    }

    @Delete(':id')
    async deleteCatalog(@Param('id') id: number): Promise<void> {
        return this.catalogService.deleteCatalog(id);
    }
}
