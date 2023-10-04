import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Rule } from '@src/attribute/relations/rule/entities/rule.entity';
import { RuleResponseI } from '@src/attribute/relations/rule/interface/rule.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const alias = 'rule';
export const indexKey = 'fk_rule_simple_condition_query';
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
        filters,
    }: {
        filters: SingleConditionDto;
    }): Promise<RuleResponseI> {
        const skip = (filters.page - 1) * filters.limit;
        let modifiedRuleList: string[] = [];
        let rawValue = null;
        let columnName = '';
        let orderBy = '';
        if (filters.select != null && filters.select[0] != undefined) {
            for (const addToSelect of RuleList) {
                modifiedRuleList.push(
                    alias + '.' + filters.select[0] + '.' + addToSelect,
                );
            }
        } else {
            modifiedRuleList = null;
        }
        if (filters.columnName != null && filters.columnName != '') {
            columnName = alias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.orderBy != null) {
            orderBy = alias + '.' + filters.orderBy;
        }
        try {
            return await this.nonRelationQuery({
                skip: skip,
                limit: filters.limit,
                selectList: modifiedRuleList,
                columnName: columnName,
                rawValue: rawValue,
                orderBy: orderBy,
                orderDirection: filters.orderDirection,
            });
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper Query',
                },
            };
        }
    }

    private async nonRelationQuery({
        skip,
        limit,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        skip: number;
        limit: number;
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<RuleResponseI> {
        return {
            status: '200',
            message: 'Success',
            result: await this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(skip)
                .take(limit)
                .cache(true)
                .useIndex(indexKey)
                .getMany(),
        };
    }
}
