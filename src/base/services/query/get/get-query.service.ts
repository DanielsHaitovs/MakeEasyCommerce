import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import {
    FilterDto,
    FilterOrderPaginationDto,
    OrderedPaginationDto,
} from '@src/base/dto/filter/filters.dto';

@Injectable()
export class GetQueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async findQuery<Entity>({
        entity,
        alias,
        conditions,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        conditions: OrderedPaginationDto;
    }): Promise<Entity[]> {
        const skip = (conditions.page - 1) * conditions.limit;
        const orderBy = alias + '.' + conditions.by;
        if (conditions.by === null || conditions.by === undefined) {
            return await this.entityManager
                .getRepository(entity)
                .createQueryBuilder(alias)
                .skip(skip)
                .take(conditions.limit)
                .getMany();
        }

        return await this.entityManager
            .getRepository(entity)
            .createQueryBuilder(alias)
            .orderBy(orderBy, conditions.type)
            .skip(skip)
            .take(conditions.limit)
            .getMany();
    }

    async findByQuery<Entity>({
        entity,
        alias,
        order,
        filters,
    }: {
        entity: EntityTarget<Entity>;
        alias: string;
        order: {
            by: string;
            type: 'ASC' | 'DESC';
        };
        filters: FilterDto;
    }): Promise<Entity[]> {
        const skip = (filters.page - 1) * filters.limit;
        const orderBy = alias + '.' + order.by;
        return await this.entityManager
            .getRepository(entity)
            .createQueryBuilder(alias)
            .orderBy(orderBy, order.type)
            .skip(skip)
            .take(filters.limit)
            .getMany();
    }
}
