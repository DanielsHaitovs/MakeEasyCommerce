import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
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
        const a1 = new Catalog();
        a1.name = 'a1';
        await this.entityManager.save(Catalog, a1);

        const a11 = new Catalog();
        a11.name = 'a11';
        a11.parent = a1;
        await this.entityManager.save(Catalog, a11);

        const a12 = new Catalog();
        a12.name = 'a12';
        a12.parent = a1;
        await this.entityManager.save(Catalog, a12);

        const a111 = new Catalog();
        a111.name = 'a111';
        a111.parent = a11;
        await this.entityManager.save(Catalog, a111);

        const a112 = new Catalog();
        a112.name = 'a112';
        a112.parent = a11;
        await this.entityManager.save(Catalog, a112);
        return null;
        // return await this.entityManager.save(Catalog, new_catalog);
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
