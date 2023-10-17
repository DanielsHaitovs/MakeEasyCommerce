import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateRuleDto } from '@src/attribute/relations/attribute-rule/dto/create-rule.dto';
import { AttributeRule } from '@src/attribute/relations/attribute-rule/entities/rule.entity';
import { CreateRuleI, GetRuleI, RuleResponseI } from '@src/attribute/relations/attribute-rule/interface/rule.interface';

import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const alias = 'rule';
export const indexKey = 'ik_attribute_rule_index';
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

    prepareRule({
        createRuleDto,
    }: {
        createRuleDto: CreateRuleDto;
    }): CreateRuleI {
        return this.entityManager.create(AttributeRule, {
            ...createRuleDto,
        });
    }

    toSingleRuleObject({
        ruleResponse,
    }: {
        ruleResponse: RuleResponseI;
    }): GetRuleI {
        if (Array.isArray(ruleResponse.result)) {
            return ruleResponse.result[0];
        }

        return ruleResponse.result;
    }

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

        if (
            filters.select != null &&
            filters.select[0] != undefined &&
            filters.select[0] === 'id'
        ) {
            modifiedRuleList.push(alias + '.' + filters.select[0]);
        } else if (filters.select != null && filters.select[0] != undefined) {
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

        if (!filters.many || filters.many === null) {
            try {
                return await this.oneNonRelationQuery({
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

        try {
            return await this.manyNonRelationQuery({
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

    private async oneNonRelationQuery({
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderType | OrderType.ASC;
    }): Promise<RuleResponseI> {
        try {
            const result: GetRuleI = await this.entityManager
            .getRepository(AttributeRule)
            .createQueryBuilder(alias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .cache(true)
            .useIndex(indexKey)
            .getOne();

            if (result != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: result,
                };
            }

            return {
                status: '404',
                message: 'Not Found',
                error: {
                    message: 'Return body is empty',
                    in: 'Rule Helper -> oneNonRelationQuery',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper -> oneNonRelationQuery',
                },
            };
        }
    }

    private async manyNonRelationQuery({
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
        try {
            const result: GetRuleI[] = await this.entityManager
            .getRepository(AttributeRule)
            .createQueryBuilder(alias)
            .where(columnName, rawValue)
            .select(selectList)
            .orderBy(orderBy, orderDirection)
            .skip(skip)
            .take(limit)
            .cache(true)
            .useIndex(indexKey)
            .getMany();

            if (result != null) {
                return {
                    status: '200',
                    message: 'Success',
                    result: result,
                };
            }

            return {
                status: '404',
                message: 'Not Found',
                error: {
                    message: 'Return body is empty',
                    in: 'Rule Helper -> manyNonRelationQuery',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper -> manyNonRelationQuery',
                },
            };
        }
    }
}
