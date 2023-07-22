import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async createCategory({
        createCategoryDto,
    }: {
        createCategoryDto: CreateCategoryDto;
    }): Promise<any> {
        const new_category = this.entityManager.create(
            Category,
            createCategoryDto,
        );

        return await this.entityManager.save(Category, new_category);
    }

    async getAllCategories(): Promise<Category[]> {
        return this.entityManager.find(Category);
    }

    async getCategoryById({ id }: { id: number }): Promise<Category> {
        return this.entityManager.findOne(Category, {
            where: {
                id: id,
            },
        });
    }

    async updateCategory(id: number, name: string): Promise<Category> {
        const category = await this.getCategoryById({ id: id });
        if (!category) {
            throw new Error(`Category with ID ${id} not found.`);
        }

        category.name = name;
        return this.entityManager.save(Category, category);
    }

    async deleteCategory(id: number): Promise<void> {
        const category = await this.getCategoryById({ id: id });
        if (!category) {
            throw new Error(`Category with ID ${id} not found.`);
        }
        await this.entityManager.remove(Category, category);
    }
}
