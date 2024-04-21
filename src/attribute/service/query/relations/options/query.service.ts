import { Injectable } from '@nestjs/common';
import { EntityManager, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { QueryService } from '@src/mec/service/query/query-filter.service';
import { DataHelperService } from '@src/mec/service/data/helper.service';
import { OptionQueryDto } from '@src/attribute/dto/filter/filter-option.dto';
import { OptionQueryFilterI } from '@src/attribute/interface/attribute.interface';
import { AttributeOptionString, StringOptionAlias } from '@src/attribute/entities/options/string-option.entity';
import { AttributeOptionNumber, NumberOptionAlias } from '@src/attribute/entities/options/number-option.entity';
import { FilterWhereValueDto } from '@src/mec/dto/query/filter.dto';
import { HandlerService } from '@src/mec/service/handler/query.service';

@Injectable()
export class OptionQueryService extends QueryService {
    private logPath = 'attribute/option/filter-error.log';

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly handlerService: HandlerService,
        private readonly dataHelper: DataHelperService
    ) {
        super();
    }

    queryFilter({ filters, alias }: { filters: OptionQueryDto; alias: string }): OptionQueryFilterI {
        const { ids, pagination, order } = this.prepareFilter({ filters, alias });

        filters.ids = ids;
        filters.pagination = pagination;
        filters.order = order;

        const stringQuery = this.filterOptionType({ filters, alias: StringOptionAlias, entity: AttributeOptionString });
        const numberQuery = this.filterOptionType({ filters, alias: NumberOptionAlias, entity: AttributeOptionNumber });

        // Left to validate result of queries above
        return {
            stringQuery,
            numberQuery
        };
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
        let query = this.entityManager.getRepository(entity).createQueryBuilder(alias);
        let many = true;
        alias = alias + '.data';

        try {
            if (filters.ids != undefined) {
                if (filters.ids.length === 1) many = false;

                query = this.whereIdsQuery({
                    ids: filters.ids,
                    alias,
                    query,
                    entity
                });
            }

            switch (entity) {
                case AttributeOptionString:
                    const stringWhereFilter = this.prepareOptionWhereValue({ whereList: filters.whereString, alias });
                    query = this.andWhereQuery({
                        where: stringWhereFilter,
                        query,
                        entity
                    });
                case AttributeOptionNumber:
                    const numberWhereFilter = this.prepareOptionWhereValue({ whereList: filters.whereNumber, alias });
                    query = this.andWhereQuery({
                        where: numberWhereFilter,
                        query,
                        entity
                    });
                default:
            }

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
                    page: filters.pagination.page,
                    limit: filters.pagination.limit,
                    query,
                    entity
                });
            }

            return query;
        } catch (error) {
            const e = error as Error;

            this.handlerService.handleError({
                e,
                message: 'Could Not Create Option Filters' + alias,
                where: this.filterOptionType.name,
                name: OptionQueryService.name,
                logPath: this.logPath
            });

            return null;
        }
    }

    private prepareOptionWhereValue({ whereList, alias }: { whereList: string[] | number[]; alias: string }): FilterWhereValueDto[] {
        if (whereList != undefined && whereList.length > 0) {
            if (!Array.isArray(whereList)) {
                return [
                    {
                        where: whereList,
                        alias
                    }
                ];
            } else {
                return whereList.flatMap((where: string | number) => {
                    return {
                        where,
                        alias
                    };
                });
            }
        }

        return null;
    }
}
