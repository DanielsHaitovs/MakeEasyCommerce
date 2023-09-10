import { Injectable, Type } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateQueryService } from './create/create-query.service';
import { GetQueryService } from './get/get-query.service';

@Injectable()
export class QueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly createQueryService: CreateQueryService,
        private readonly getQueryService: GetQueryService,
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
}
