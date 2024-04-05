import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule } from '@src/rule/entities/rule.entity';

import { RuleQueryDto } from '@src/rule/dto/filter.dto';
import { FilterWhereValueDto } from '@src/mec/dto/query/filter.dto';
import { RuleQueryFilterI } from '@src/rule/interface/rule.interface';

import { QueryService } from '@src/mec/service/query/query-filter.service';
import { DataHelperService } from '@src/mec/service/data/helper.service';
import { IsNumber } from '@nestjs/class-validator';

@Injectable()
export class RuleQueryService extends QueryService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService
    ) {
        super();
    }

    queryFilter({ filters, alias }: { filters: RuleQueryDto; alias: string }): RuleQueryFilterI {
        filters = this.ruleQueryFilter({ filters });
        const queryFilter = this.prepareFilter({ filters, alias });

        const selectWhere: FilterWhereValueDto[] = this.prepareRuleWhere({
            filters
        });
        let many = true;

        try {
            let ruleQuery = this.entityManager.getRepository(AttributeRule).createQueryBuilder(alias);

            if (filters.ruleIds != undefined) {
                if (filters.ruleIds.length === 1) many = false;

                ruleQuery = this.whereIdsQuery({
                    ids: filters.ruleIds,
                    alias: alias,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            if (filters.selectWhere != undefined) {
                ruleQuery = this.andWhereQuery({
                    where: selectWhere,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            if (filters.selectProp != undefined) {
                ruleQuery = this.selectQuery({
                    properties: filters.selectProp,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            if (queryFilter.order != undefined) {
                ruleQuery = this.orderQuery({
                    by: queryFilter.order.by,
                    direction: queryFilter.order.direction,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            if (many) {
                ruleQuery = this.paginateQuery({
                    page: queryFilter.pagination.page,
                    limit: queryFilter.pagination.limit,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            return {
                many: many,
                query: ruleQuery
            };
        } catch (e) {
            const error = e as Error;
            return {
                message: error.message,
                query: undefined,
                many: undefined
            };
        }
    }

    protected ruleQueryFilter({ filters }: { filters: RuleQueryDto }): RuleQueryDto {
        if (filters.selectWhere != undefined && filters.selectWhere.length > 0) {
            if (!Array.isArray(filters.selectWhere)) filters.selectWhere = [filters.selectWhere];
            filters.findByValue = filters.findByValue ?? true;
        } else {
            filters.selectWhere = undefined;
            filters.findByValue = undefined;
        }

        if (filters.ruleIds != undefined) {
            const { ruleIds } = filters;
            if (!Array.isArray(ruleIds) && IsNumber(ruleIds)) {
                filters.ruleIds = [ruleIds];
            } else {
                filters.ruleIds = undefined;
            }
        }

        if (filters.selectProp != undefined && filters.selectProp.length < 1) filters.selectProp = undefined;

        return filters;
    }

    private prepareRuleWhere({ filters }: { filters: RuleQueryDto }): FilterWhereValueDto[] {
        if (filters.selectWhere === undefined) return undefined;

        const condition: FilterWhereValueDto[] = [];
        for (const where of filters.selectWhere) {
            condition.push({
                alias: where.toString(),
                where:
                    this.dataHelper.valueToBoolean({
                        value: filters.findByValue
                    }) ?? true
            });
        }

        return condition;
    }
}
