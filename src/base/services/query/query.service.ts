import { Injectable, Type } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CreateQueryService } from './create/create-query.service';
import { GetQueryService } from './get/get-query.service';
import { SimpleConditionsDto } from '@src/base/dto/filter/filters.dto';
import { QueryBaseResponse } from '@src/base/dto/responses/response.create-query.dto';

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
    ): Promise<Entity | any> {
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
    }): Promise<GetDTO | GetDTO[] | QueryBaseResponse> {
        const toEntity = plainToClass(dtoClass, dto);
        if (toEntity != null) {
            switch (dtoClass.name) {
                case 'Option':
                    console.log('Option');
                    break;
                case 'CreateRulesDto':
                    return await this.createQueryService.saveQuery({
                        entity: target,
                        newObj: dto,
                        getDto: getDto,
                    });
                case 'Attribute':
                    console.log('Attribute');
                    break;
                default:
                    console.log('default');
                    break;
            }

            return {
                error: {
                    message:
                        'Could not find Requested entity for MEC-Query was not found',
                    in: toEntity.constructor.name,
                },
            };
        }
        return {
            error: {
                message: 'Something went wrong saving new Rule entity',
                in: toEntity.constructor.name,
            },
        };
    }

    async findEntityByQuery<Entity, GetDTO, GetDTOClass>({
        entity,
        getDto,
        dtoClass,
        filters,
    }: {
        entity: EntityTarget<Entity>;
        getDto: GetDTO;
        dtoClass: Type<GetDTOClass>;
        filters: SimpleConditionsDto;
    }): Promise<GetDTO | GetDTO[] | QueryBaseResponse> {
        const toEntity = plainToClass(dtoClass, getDto);
        if (toEntity != null) {
            switch (dtoClass.name) {
                case 'Option':
                    console.log('Option');
                    break;
                case 'GetRulesDto':
                    return await this.getQueryService.findSingleQuery({
                        entity: entity,
                        getDto: getDto,
                        alias: 'rule',
                        simpleFilters: filters,
                    });
                case 'Attribute':
                    console.log('Attribute');
                    break;
                default:
                    console.log('default');
                    break;
            }

            return {
                error: {
                    message:
                        'Could not find Requested entity for MEC-Query was not found',
                    in: toEntity.constructor.name,
                },
            };
        }
        return {
            error: {
                message: 'Something went wrong saving new Rule entity',
                in: toEntity.constructor.name,
            },
        };
    }
}
