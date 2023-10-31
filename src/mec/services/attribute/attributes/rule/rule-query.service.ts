import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RuleFilterRequestDto } from '@src/mec/dto/query/attribute/attributes/rule-filter.dto';
import { RuleSelect } from '@src/mec/enum/attribute/attributes/rule-type.enum';
import { RuleQueryFilterI } from '@src/mec/interface/attribute/attributes/rule-base.interface';
import { DataHelperService } from '@src/utils/data-help.service';
import { QueryFilterService } from '@src/mec/services/query/query-filter.service';
import { Rule } from '@src/rule/entities/rule.entity';
import {
    GetRuleI,
    RuleResponseI,
} from '@src/rule/interface/get-rule.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class RuleQueryService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly dataHelper: DataHelperService,
    ) {
        super();
    }

    protected toSingleRuleObject({
        response,
    }: {
        response: RuleResponseI;
    }): GetRuleI {
        return this.dataHelper.toSingleObject({ response });
    }

    protected prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: RuleFilterRequestDto;
        alias: string;
    }): RuleQueryFilterI {
        const queryFilter = super.prepareQueryFilter({ filters, alias });
        const many = true;
        try {
            const onlyActive: boolean = this.dataHelper.valueToBoolean(
                filters.valueSettings,
            );
            let ruleQuery = this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias);

            if (filters.valueIds != undefined && filters.valueIds != null) {
                ruleQuery = this.whereIdsQuery({
                    ids: filters.valueIds,
                    alias: alias,
                    query: ruleQuery,
                    entity: Rule,
                });

                if (filters.valueIds.length === 1) {
                    many: false;
                }

                if (onlyActive != null) {
                    const filterList = this.getRuleFilterAlias();
                    filterList.forEach((rule) => {
                        ruleQuery = this.orHaveQuery({
                            alias: rule,
                            value: {
                                value: onlyActive,
                            },
                            groupBy: RuleSelect.Id,
                            query: ruleQuery,
                            entity: Rule,
                        });
                    });
                }
            }

            if (filters.valueIds === undefined && onlyActive != null) {
                const filterList = this.getRuleFilterAlias();
                filterList.forEach((rule) => {
                    ruleQuery = this.orWhereQuery({
                        alias: rule,
                        value: {
                            value: onlyActive,
                        },
                        query: ruleQuery,
                        entity: Rule,
                    });
                });
            }

            if (filters.selectProp != null) {
                ruleQuery = this.selectQuery({
                    properties: filters.selectProp,
                    query: ruleQuery,
                    entity: Rule,
                });
            }

            if (queryFilter.order.by != null) {
                ruleQuery = this.orderQuery({
                    by: queryFilter.order.by,
                    direction: queryFilter.order.direction,
                    query: ruleQuery,
                    entity: Rule,
                });
            }

            if (many) {
                ruleQuery = this.paginateQuery({
                    page: queryFilter.pagination.page,
                    limit: queryFilter.pagination.limit,
                    query: ruleQuery,
                    entity: Rule,
                });
            }

            return {
                message: null,
                many: many,
                query: ruleQuery,
                ...queryFilter,
            };
        } catch (e) {
            return {
                message: e.message,
                query: null,
                many: null,
                ...queryFilter,
            };
        }
    }

    protected getRuleFilterAlias(): string[] {
        return [
            'rule.front.useInCatalog = :value',
            'rule.front.useInListing = :value',
            'rule.front.useInLayeredNavigation = :value',
            'rule.front.useInFilter = :value',
            'rule.front.useInOptionFilter = :value',
            'rule.front.useInSort = :value',
            'rule.front.useInSearch = :value',
            'rule.front.useInPromo = :value',
            'rule.front.useInReport = :value',
            'rule.back.useInCatalog = :value',
            'rule.back.useInListing = :value',
            'rule.back.useInLayeredNavigation = :value',
            'rule.back.useInFilter = :value',
            'rule.back.useInOptionFilter = :value',
            'rule.back.useInSort = :value',
            'rule.back.useInSearch = :value',
            'rule.back.useInPromo = :value',
            'rule.back.useInReport = :value',
        ];
    }
}
