// src/category/category.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('new')
    @ApiOperation({
        summary: 'Create Category',
        description: 'Create (specifically) category entity',
    })
    @ApiBody({
        type: CreateCategoryDto,
        description: 'Create Basket',
        required: true,
    })
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
        return await this.categoryService.createCategory({
            createCategoryDto: createCategoryDto,
        });
    }

    @Get()
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    async getCategoryById(@Param('id') id: number): Promise<Category> {
        return this.categoryService.getCategoryById({ id: id });
    }

    @Put(':id')
    async updateCategory(
        @Param('id') id: number,
        @Body('name') name: string,
    ): Promise<Category> {
        return this.categoryService.updateCategory(id, name);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: number): Promise<void> {
        return this.categoryService.deleteCategory(id);
    }
}
