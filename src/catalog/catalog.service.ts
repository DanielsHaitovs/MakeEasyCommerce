import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Injectable()
export class CatalogService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async createCatalog({
        createCatalogDto,
    }: {
        createCatalogDto: CreateCatalogDto;
    }): Promise<any> {
        const new_catalog = this.entityManager.create(
            Catalog,
            createCatalogDto,
        );

        return await this.entityManager.save(Catalog, new_catalog);
    }

    async getAllCatalogs(): Promise<Catalog[]> {
        return this.entityManager.find(Catalog);
    }

    async getCatalogById({ id }: { id: number }): Promise<Catalog> {
        return this.entityManager.findOne(Catalog, {
            where: {
                id: id,
            },
        });
    }

    async updateCatalog(id: number, name: string): Promise<Catalog> {
        const catalog = await this.getCatalogById({ id: id });
        if (!catalog) {
            throw new Error(`catalog with ID ${id} not found.`);
        }

        catalog.name = name;
        return this.entityManager.save(Catalog, catalog);
    }

    async deleteCatalog(id: number): Promise<void> {
        const catalog = await this.getCatalogById({ id: id });
        if (!catalog) {
            throw new Error(`catalog with ID ${id} not found.`);
        }
        await this.entityManager.remove(Catalog, catalog);
    }
}
