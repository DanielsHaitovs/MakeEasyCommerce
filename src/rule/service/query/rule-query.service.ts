import { Injectable } from '@nestjs/common';
import {
    Entity,
    EntityManager,
    EntityTarget,
    SelectQueryBuilder,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { AttributeRule } from '@src/rule/entities/rule.entity';
import { RuleWhere } from '@src/mec/enum/attribute/attributes/rule.enum';

import { RuleQueryFilterDto } from '@src/mec/dto/filter/attribute/attributes/rule-filter.dto';
import { RuleQueryFilterI } from '@src/rule/interface/rule.interface';

import { QueryFilterService } from '@src/mec/service/query/query-filter.service';
import { DataHelperService } from '@src/mec/utils/data-help.service';

@Injectable()
export class RuleQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
    ) {
        super();
    }

    prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: RuleQueryFilterDto;
        alias: string;
    }): RuleQueryFilterI {
        const queryFilter = super.prepareQueryFilter({ filters, alias });
        filters = this.resolveRuleFilter({ filters });
        let many = true;

        try {
            let ruleQuery = this.entityManager
                .getRepository(AttributeRule)
                .createQueryBuilder(alias);

            if (filters.ruleIds != undefined) {
                if (filters.ruleIds.length === 1) many = false;

                ruleQuery = this.resolveWhereQuery({
                    alias: alias,
                    query: ruleQuery,
                    filters: filters,
                });
            }

            if (filters.selectWhere != undefined) {
                ruleQuery = this.prepareRuleWhere({
                    ruleWhere: filters.selectWhere,
                    whereValue: filters.whereValue,
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

    private resolveWhereQuery({
        alias,
        query,
        filters,
    }: {
        alias: string;
        query: SelectQueryBuilder<AttributeRule>;
        filters: RuleQueryFilterDto;
    }): SelectQueryBuilder<AttributeRule> {
        query = this.whereIdsQuery({
            ids: filters.ruleIds,
            alias: alias,
            query,
            entity: Entity,
        });

        if (filters.selectWhere !== null) {
            query = this.prepareRuleWhere({
                ruleWhere: filters.selectWhere,
                whereValue: filters.whereValue,
                query,
                entity: Entity,
            });
        }

        return query;
    }

    private resolveRuleFilter({
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
        return filters;
    }

    private prepareRuleWhere<Entity>({
        ruleWhere,
        whereValue,
        query,
    }: {
        ruleWhere: RuleWhere[];
        whereValue: boolean;
        query: SelectQueryBuilder<Entity>;
        entity: EntityTarget<Entity>;
    }): SelectQueryBuilder<Entity> {
        if (ruleWhere === undefined || ruleWhere == null) return query;
        ruleWhere.forEach((whereAlias) => {
            query = this.andWhereQuery({
                alias: whereAlias + ' = :value',
                data: {
                    value: whereValue,
                },
                query,
                entity: Entity,
            });
        });

        return query;
    }
}
