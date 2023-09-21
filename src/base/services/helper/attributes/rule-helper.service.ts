import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Rule } from '@src/attribute/relations/rule/entities/rule.entity';
import { RuleResponseInterface } from '@src/attribute/relations/rule/interface/rule.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const RuleList: string[] = [
    'useInCatalog',
    'useInListing',
    'useInLayeredNavigation',
    'useInFilter',
    'useInOptionFilter',
    'useInSort',
    'useInSearch',
    'useInPromo',
    'useInReport',
];

@Injectable()
export class RuleHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}
    async singleConditionRuleQuery({
        alias,
        filters,
    }: {
        alias: string;
        filters: SingleConditionDto;
    }): Promise<RuleResponseInterface> {
        const skip = (filters.page - 1) * filters.limit;
        let ruleList: string[] = [];
        let rawValue = null;
        let columnName = '';
        if (filters.select[0] != null) {
            for (const addToSelect of RuleList) {
                ruleList.push(
                    alias + '.' + filters.select[0] + '.' + addToSelect,
                );
            }
        } else {
            ruleList = null;
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName = alias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            filters.orderBy = alias + '.' + filters.orderBy;
        }
        try {
            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                selectList: ruleList,
                alias: alias,
                columnName: columnName,
                rawValue: rawValue,
                orderBy: filters.orderBy,
                orderDirection: filters.orderDirection,
            });
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Rule Helper Query',
                },
            };
        }
    }

    async nonRelationQuery({
        skip,
        limit,
        selectList,
        alias,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
        selectList: string[];
        alias: string;
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<RuleResponseInterface> {
        return {
            result: await this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex('fk_rule_simple_condition_query')
                .getMany(),
        };
    }
}
