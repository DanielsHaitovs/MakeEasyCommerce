import { Injectable, Type } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CreateQueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async prepareEntityQuery<Entity, DTO>(
        entity: EntityTarget<Entity>,
        dto: DTO,
        dtoClass: Type<Entity>,
    ): Promise<Entity> {
        console.log(plainToClass(dtoClass, dto));
        const test = await this.entityManager.create(
            entity,
            plainToClass(dtoClass, dto),
        );
        return test;
    }

    async createAndSave<Entity, DTO>(
        entity: EntityTarget<Entity>,
        dto: DTO,
        dtoClass: Type<Entity>,
    ): Promise<Entity> {
        return await this.entityManager.save(
            entity,
            await this.prepareEntityQuery(entity, dto, dtoClass),
        );
    }
}
