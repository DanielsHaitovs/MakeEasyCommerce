import { Injectable, Type } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateQueryService } from './create/create-query.service';
import { GetQueryService } from './get/get-query.service';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import {
    QueryErrorResponse,
    QueryResponse,
} from '@src/base/dto/responses/response.create-query.dto';

@Injectable()
export class QueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly createQueryService: CreateQueryService,
        private readonly getQueryService: GetQueryService,
    ) {}

    async prepareEntityQuery<Entity, createDTO>(
        entity: EntityTarget<Entity>,
        dto: createDTO,
        dtoClass: Type<Entity>,
    ): Promise<Entity | QueryErrorResponse> {
        const toEntity = plainToClass(dtoClass, dto);
        if (toEntity != null) {
            switch (dtoClass.name) {
                case 'Option':
                    console.log('Option');
                    break;
                case 'CreateRulesDto':
                    console.log('Rule');
                    return await this.createQueryService.prepareQuery(
                        entity,
                        toEntity,
                    );
                    break;
                case 'Attribute':
                    console.log('Attribute');
                    break;
                default:
                    console.log('default');
                    break;
            }

            return {
                result: dto,
                error: {
                    message: 'Requested entity was not found',
                    in: dtoClass.name,
                },
            };
        }

        return {
            result: dto,
            error: {
                message: 'Something went wrong preparing new Rule entity',
                in: dtoClass.name,
            },
        };
    }

    async createEntityQuery<Entity, createDTO, GetDTO>({
        target,
        dto,
        dtoClass,
        getDto,
    }: {
        target: EntityTarget<Entity>;
        dto: createDTO;
        dtoClass: Type<createDTO>;
        getDto: GetDTO;
    }): Promise<QueryResponse> {
        const toEntity = plainToClass(dtoClass, dto);
        if (toEntity != null) {
            switch (dtoClass.name) {
                case 'Option':
                    console.log('Option');
                    break;
                case 'CreateRulesDto':
                    return {
                        result: await this.createQueryService.saveQuery({
                            entity: target,
                            newObj: dto,
                            getDto: getDto,
                        }),
                    };
                case 'Attribute':
                    console.log('Attribute');
                    break;
                default:
                    console.log('default');
                    break;
            }

            return {
                result: null,
                error: {
                    message: 'Requested entity for MEC-Query was not found',
                    in: toEntity.constructor.name,
                },
            };
        }

        return {
            result: null,
            error: {
                message: 'Something went wrong saving new Rule entity',
                in: toEntity.constructor.name,
            },
        };
    }

    async findEntityQuery<Entity>({
        entity,
        filters,
        dtoClass,
    }: {
        entity: EntityTarget<Entity>;
        filters: OrderedPaginationDto;
        dtoClass: Type<Entity>;
    }): Promise<any> {
        switch (dtoClass.name) {
            case 'GetRulesDto':
                return await this.getQueryService.findQuery({
                    entity,
                    alias: 'rule',
                    conditions: {
                        by: filters.by,
                        type: filters.type,
                        page: filters.page,
                        limit: filters.limit,
                    },
                });
            case 'Option':
                console.log('Option');
                break;
            case 'Attribute':
                console.log('Attribute');
                break;
            default:
                console.log('default');
                break;
        }
    }

    async findSingleEntityQuery<Entity>({
        entity,
        many,
        filters,
        dtoClass,
    }: {
        entity: EntityTarget<Entity>;
        many: boolean;
        filters: OrderedPaginationDto;
        dtoClass: Type<Entity>;
    }): Promise<any> {
        switch (dtoClass.name) {
            case 'GetRulesDto':
                return await this.getQueryService.findQuery({
                    entity,
                    alias: 'rule',
                    conditions: {
                        by: filters.by,
                        type: filters.type,
                        page: filters.page,
                        limit: filters.limit,
                    },
                });
            case 'Option':
                console.log('Option');
                break;
            case 'Attribute':
                console.log('Attribute');
                break;
            default:
                console.log('default');
                break;
        }
    }
}
