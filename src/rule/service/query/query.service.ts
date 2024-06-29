import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule, RuleAlias } from '@src/rule/entities/rule.entity';

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
        let many = true;

        try {
            const queryFilter = this.ruleQueryFilter({ filters, alias: RuleAlias });

            let ruleQuery = this.entityManager.getRepository(AttributeRule).createQueryBuilder(alias);
            if (queryFilter.ids != undefined) {
                if (queryFilter.ids.length === 1) many = false;

                ruleQuery = this.whereIdsQuery({
                    ids: queryFilter.ids,
                    query: ruleQuery,
                    entity: AttributeRule
                });
            }

            for (const select of filters.findWhere) {
                ruleQuery = this.andWhereQuery({
                    where: select.value,
                    alias: select.property,
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

    protected ruleQueryFilter({ filters, alias }: { filters: RuleQueryDto; alias: string }): RuleQueryDto {
        if (filters.findWhere != undefined && filters.findWhere.length < 1) filters.findWhere = undefined;
        if (filters.selectProp != undefined && filters.selectProp.length < 1) filters.selectProp = undefined;

        if (filters.findWhere != undefined) {
            filters.findWhere.forEach((filter) => {
                filter.value = this.dataHelper.valueToBoolean({ value: filter.value });
            });
        }

        return { ...filters, ...this.prepareFilter({ filters, alias }) };
    }
}
