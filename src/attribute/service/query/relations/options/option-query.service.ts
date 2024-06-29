import { Injectable } from '@nestjs/common';
import { EntityManager, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { QueryService } from '@src/mec/service/query/query-filter.service';
import { OptionQueryDto } from '@src/attribute/dto/filter/filter-option.dto';
import { OptionQueryFilterI } from '@src/attribute/interface/attribute.interface';
import { AttributeOptionString, StringOptionAlias } from '@src/attribute/entities/options/string-option.entity';
import { AttributeOptionNumber, NumberOptionAlias } from '@src/attribute/entities/options/number-option.entity';
import { HandlerService } from '@src/mec/service/handler/query.service';
import { QueryResponseDto } from '@src/mec/dto/query/response.dto';

@Injectable()
export class OptionQueryService extends QueryService {
    private logPath = 'attribute/option/filter-error.log';
    private stringQueryError: QueryResponseDto;
    private numberQueryError: QueryResponseDto;

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService
    ) {
        super();
    }

    queryFilter({ filters }: { filters: OptionQueryDto }): OptionQueryFilterI {
        try {
            const query: OptionQueryFilterI = {
                stringQuery: null,
                numberQuery: null
            };

            query.stringQuery = this.filterOptionType({ filters, alias: StringOptionAlias, entity: AttributeOptionString });

            if (this.stringQueryError?.error != undefined || this.stringQueryError?.message != undefined) {
                query.stringResponse = this.stringQueryError;
            }

            query.numberQuery = this.filterOptionType({ filters, alias: NumberOptionAlias, entity: AttributeOptionNumber });

            if (this.numberQueryError?.error != undefined || this.numberQueryError?.message != undefined) {
                query.numberResponse = this.numberQueryError;
            }

            // Left to validate result of queries above
            return query;
        } catch (error) {
            const e = error as Error;
            return {
                e,
                message: e.message,
                numberQuery: undefined,
                stringQuery: undefined,
                stringResponse: this.stringQueryError,
                numberResponse: this.numberQueryError
            };
        }
    }

    protected filterOptionType<Entity>({
        filters,
        alias,
        entity
    }: {
        filters: OptionQueryDto;
        alias: string;
        entity: EntityTarget<Entity>;
    }): SelectQueryBuilder<Entity> {
        let optionIds: number[];
        let whereList: string[] | number[] = [];

        if (alias === StringOptionAlias) {
            optionIds = filters.whereStringIds;
            whereList = filters.whereString;
            this.stringQueryError = null;
        } else if (alias === NumberOptionAlias) {
            optionIds = filters.whereNumberIds;
            whereList = filters.whereNumber;
            this.numberQueryError = null;
        }

        const { ids, pagination, order } = this.prepareFilter({
            filters: {
                ids: optionIds,
                ...filters
            },
            alias
        });

        optionIds = ids;

        filters.pagination = pagination;
        filters.order = order;
        let query = this.entityManager.getRepository(entity).createQueryBuilder(alias);
        let many = true;

        try {
            if (optionIds != undefined) {
                if (optionIds.length === 1) many = false;
                query = this.whereIdsQuery({
                    ids: optionIds,
                    query,
                    entity
                });
            }

            query = this.andWhereInQuery({
                where: whereList,
                alias: `${alias}.data`,
                query,
                entity
            });

            // Let me look at it every time I'm here and think if we need it.
            // id, data, createdAt, updatedAt. attribute will not be loaded, relational filter in not included in option filtering logic
            // if (filters.selectProp != undefined) {
            //     query = this.selectQuery({
            //         properties: filters.selectProp,
            //         query,
            //         entity
            //     });
            // }
            if (many) {
                if (filters.order != undefined) {
                    query = this.orderQuery({
                        by: filters.order.by,
                        direction: filters.order.direction,
                        query,
                        entity
                    });
                }

                query = this.paginateQuery({
                    pagination: filters.pagination,
                    query,
                    entity
                });
            }

            return query;
        } catch (error) {
            const e = error as Error;

            switch (entity) {
                case AttributeOptionString:
                    this.stringQueryError = this.handlerService.handleError({
                        e,
                        message: 'Could Not Create String Option Filters' + alias,
                        where: this.filterOptionType.name,
                        name: OptionQueryService.name,
                        logPath: this.logPath
                    });
                case AttributeOptionNumber:
                    this.stringQueryError = this.handlerService.handleError({
                        e,
                        message: 'Could Not Create Number Option Filters' + alias,
                        where: this.filterOptionType.name,
                        name: OptionQueryService.name,
                        logPath: this.logPath
                    });
                default:
                    return null;
            }
        }
    }
}
