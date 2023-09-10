import { Injectable, Type } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GetQueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async prepareEntityQuery<Entity, DTO>(
        entity: EntityTarget<Entity>,
        dto: DTO,
        dtoClass: Type<Entity>,
    ): Promise<Entity | any> {
        const testResult = plainToClass(dtoClass, dto);
        if (testResult != null) {
            return await this.entityManager.create(
                entity,
                plainToClass(dtoClass, dto),
            );
        }

        return 'smth went wrong';
    }

    async createAndSave<Entity, DTO>(
        entity: EntityTarget<Entity>,
        dto: DTO,
        dtoClass: Type<Entity>,
    ): Promise<Entity | any> {
        return await this.entityManager.save(
            entity,
            await this.prepareEntityQuery(entity, dto, dtoClass),
        );
    }

    async prepareAndUpdate<Entity, DTO>(
        entity: EntityTarget<Entity>,
        dto: DTO,
        dtoClass: Type<Entity>,
    ): Promise<Entity | any> {
        return null;
        // return await this.entityManager.save(
        //     entity,
        //     await this.prepareEntityQuery(entity, dto, dtoClass),
        // );
    }
}
