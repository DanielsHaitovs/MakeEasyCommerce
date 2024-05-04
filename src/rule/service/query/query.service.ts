import { Injectable } from '@nestjs/common';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule } from '@src/rule/entities/rule.entity';

import { RuleQueryDto } from '@src/rule/dto/filter.dto';
import { RuleQueryFilterI } from '@src/rule/interface/rule.interface';

import { QueryService } from '@src/mec/service/query/query-filter.service';
import { DataHelperService } from '@src/mec/service/data/helper.service';

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
        let many = true;

        try {
            const queryFilter = this.prepareFilter({ filters, alias: undefined });

            let ruleQuery = this.entityManager.getRepository(AttributeRule).createQueryBuilder(alias);
            if (queryFilter.ids != undefined) {
                if (queryFilter.ids.length === 1) many = false;

                ruleQuery = this.whereIdsQuery({
                    ids: queryFilter.ids,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            for (const select of filters.selectWhere) {
                ruleQuery = this.andWhereQuery({
                    where: [filters.findByValue],
                    alias: select,
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
                    pagination: queryFilter.pagination,
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
            filters.findByValue = filters.findByValue;
        } else {
            filters.selectWhere = undefined;
            filters.findByValue = undefined;
        }

        if (filters.selectProp != undefined && filters.selectProp.length < 1) filters.selectProp = undefined;

        return filters;
    }

    private prepareRuleWhere({
        filters,
        query
    }: {
        filters: RuleQueryDto;
        query: SelectQueryBuilder<AttributeRule>;
    }): SelectQueryBuilder<AttributeRule> {
        if (filters.selectWhere === undefined) return undefined;
        try {

        } catch (error) {
            return query;
        }
    }
}
