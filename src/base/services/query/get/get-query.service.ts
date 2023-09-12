import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import {
    FilterDto,
    OrderedPaginationDto,
    SimpleConditionsDto,
} from '@src/base/dto/filter/filters.dto';
import { QueryBaseResponse } from '@src/base/dto/responses/response.create-query.dto';

@Injectable()
export class GetQueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    async findSingleQuery<Entity, GetDTO>({
        entity,
        getDto,
        alias,
        simpleFilters,
    }: {
        entity: EntityTarget<Entity>;
        getDto: GetDTO;
        alias: string;
        simpleFilters: SimpleConditionsDto;
    }): Promise<GetDTO | GetDTO[] | QueryBaseResponse> {
        try {
            console.log('simpleFilters');
            console.log(simpleFilters);
            const where = alias + '.' + simpleFilters.columnName + ' = :value';
            console.log('where');
            console.log(where);
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
}
