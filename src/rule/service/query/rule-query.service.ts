import { Injectable } from '@nestjs/common';
import { Entity, EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule } from '@src/rule/entities/rule.entity';

import { RuleQueryFilterDto } from '@src/rule/dto/filter/rule-filter.dto';
import { RuleQueryFilterI } from '@src/rule/interface/rule.interface';

import { QueryFilterService } from '@src/mec/service/query/query-filter.service';
import { FilterWhereValueDto } from '@src/mec/dto/filter/query-filter.dto';
import { DataHelperService } from '@src/utils/data-help.service';

@Injectable()
export class RuleQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
    ) {
        super();
    }

    queryFilter({
        filters,
        alias,
    }: {
        filters: RuleQueryFilterDto;
        alias: string;
    }): RuleQueryFilterI {
        filters = this.ruleQueryFilter({ filters });
        const queryFilter = super.queryFilter({ filters, alias });
        const selectWhere: FilterWhereValueDto[] = this.prepareRuleWhere({
            filters,
        });
        let many = true;

        try {
            let ruleQuery = this.entityManager
                .getRepository(AttributeRule)
                .createQueryBuilder(alias);

            if (filters.ruleIds != undefined) {
                if (filters.ruleIds.length === 1) many = false;

                ruleQuery = this.whereIdsQuery({
                    ids: filters.ruleIds,
                    alias: alias,
                    query: ruleQuery,
                    entity: Entity,
                });
            }

            if (filters.selectWhere != undefined) {
                ruleQuery = this.andWhereQuery({
                    where: selectWhere,
                    query: ruleQuery,
                    entity: AttributeRule,
                });
            }

            if (filters.selectProp != undefined) {
                ruleQuery = this.selectQuery({
                    properties: filters.selectProp,
                    query: ruleQuery,
                    entity: AttributeRule,
                });
            }

            if (queryFilter.order.by != undefined) {
                ruleQuery = this.orderQuery({
                    by: queryFilter.order.by,
                    direction: queryFilter.order.direction,
                    query: ruleQuery,
                    entity: AttributeRule,
                });
            }

            if (many) {
                ruleQuery = this.paginateQuery({
                    page: queryFilter.pagination.page,
                    limit: queryFilter.pagination.limit,
                    query: ruleQuery,
                    entity: AttributeRule,
                });
            }

            return {
                message: undefined,
                many: many,
                query: ruleQuery,
                ...queryFilter,
            };
        } catch (e) {
            const error = e as Error;
            return {
                message: error.message,
                query: undefined,
                many: undefined,
                ...queryFilter,
            };
        }
    }

    protected ruleQueryFilter({
        filters,
    }: {
        filters: RuleQueryFilterDto;
    }): RuleQueryFilterDto {
        if (
            filters.selectWhere != undefined &&
            filters.selectWhere.length > 0
        ) {
            if (!Array.isArray(filters.selectWhere))
                filters.selectWhere = [filters.selectWhere];
            filters.whereValue = filters.whereValue ?? true;
        } else {
            filters.selectWhere = undefined;
            filters.whereValue = undefined;
        }

        if (!Array.isArray(filters.ruleIds) && filters.ruleIds < 1) {
            filters.ruleIds = undefined;
        }

        if (filters.selectProp === null || filters.selectProp.length < 1)
            filters.selectProp = undefined;

        return filters;
    }

    private prepareRuleWhere({
        filters,
    }: {
        filters: RuleQueryFilterDto;
    }): FilterWhereValueDto[] {
        if (filters.selectWhere === undefined) return undefined;

        const condition: FilterWhereValueDto[] = [];
        for (const where of filters.selectWhere) {
            condition.push({
                alias: where.toString(),
                where:
                    this.dataHelper.valueToBoolean({
                        value: filters.whereValue,
                    }) ?? true,
            });
        }

        return condition;
    }
}
