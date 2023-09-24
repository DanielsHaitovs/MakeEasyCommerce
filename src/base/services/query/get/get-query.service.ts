import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { QueryBaseResponse } from '@src/base/dto/responses/response.create-query.dto';

@Injectable()
export class GetQueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async findSingleQuery<Entity, GetDTO>({
        entity,
        alias,
        simpleFilters,
    }: {
        entity: EntityTarget<Entity>;
        getDto: GetDTO;
        alias: string;
        simpleFilters: SingleConditionDto;
    }): Promise<GetDTO | QueryBaseResponse> {
        try {
            const where = alias + '.' + simpleFilters.columnName + ' = :value';
            return await this.entityManager
                .getRepository(entity)
                .createQueryBuilder(alias)
                .where(where, {
                    value: simpleFilters.value,
                })
                .getOne();
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: `Error happened while retrieving ${entity.constructor.name} entity`,
                },
            };
        }
    }

    async findSingleAndSelectQuery<Entity, GetDTO>({
        entity,
        alias,
        simpleFilters,
    }: {
        entity: EntityTarget<Entity>;
        getDto: GetDTO;
        alias: string;
        simpleFilters: SingleConditionDto;
    }): Promise<GetDTO | QueryBaseResponse> {
        try {
            const where = alias + '.' + simpleFilters.columnName + ' = :value';
            const select = alias + simpleFilters.orderDirection;
            return await this.entityManager
                .getRepository(entity)
                .createQueryBuilder(alias)
                .where(where, {
                    value: simpleFilters.value,
                })
                .select([`${alias}`, select])
                .getOne();
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: `Error happened while retrieving ${entity.constructor.name} entity`,
                },
            };
        }
    }

    async findAllSimpleQuery<Entity, GetDTO>({
        entity,
        alias,
        simpleFilters,
    }: {
        entity: EntityTarget<Entity>;
        getDto: GetDTO;
        alias: string;
        simpleFilters: SingleConditionDto;
    }): Promise<Entity[] | QueryBaseResponse> {
        try {
            const skip = (simpleFilters.page - 1) * simpleFilters.limit;
            return await this.entityManager
                .getRepository(entity)
                .createQueryBuilder(alias)
                .orderBy(simpleFilters.orderBy, simpleFilters.orderDirection)
                .skip(skip)
                .take(simpleFilters.limit)
                .getMany();
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: `Error happened while retrieving ${entity.constructor.name} entity`,
                },
            };
        }
    }
}
