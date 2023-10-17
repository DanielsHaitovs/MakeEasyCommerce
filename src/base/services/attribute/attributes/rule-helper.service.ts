import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CreateRuleDto } from '@src/attribute/relations/attribute-rule/dto/create-rule.dto';
import { AttributeRule } from '@src/attribute/relations/attribute-rule/entities/rule.entity';
import { CreateRuleI, GetRuleI, RuleResponseI } from '@src/attribute/relations/attribute-rule/interface/rule.interface';
import { RuleConditionDto } from '@src/base/dto/filter/filters.dto';
import { RuleFilter } from '@src/base/enum/attributes/rule-type.enum';
import { OrderType } from '@src/base/enum/query/query.enum';
import { EntityManager } from 'typeorm';

export const alias = 'rule';
export const indexKey = 'ik_attribute_rule_index';

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
        filters: RuleConditionDto;
    }): Promise<RuleResponseI> {
        const queryFilter = this.prepareRuleFilter({ filters });

        if (!filters.many || filters.many === null) {
            return await this.oneNonRelationQuery({
                selectList: queryFilter.selectForRule,
                columnName: queryFilter.column,
                rawValue: queryFilter.value,
                orderBy: queryFilter.orderBy,
                orderDirection: queryFilter.orderDirection,
            });
        }

        return await this.nonRelationQuery({
            skip: queryFilter.skip,
            limit: queryFilter.limit,
            selectList: queryFilter.selectForRule,
            columnName: queryFilter.column,
            rawValue: queryFilter.value,
            orderBy: queryFilter.orderBy,
            orderDirection: queryFilter.orderDirection,
        });
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
                    in: 'Rule Helper -> nonRelationQuery',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper -> nonRelationQuery',
                },
            };
        }
    }

    
    private prepareRuleFilter({
        filters,
    }: {
        filters: RuleConditionDto;
    }) {
        const skip = (filters.page - 1) * filters.limit;
        const modifiedRuleList: string[] = [];
        let rawValue = null;
        let columnName = '';

        if (filters.columnName != null && filters.value != null) {
            columnName = alias + '.' + filters.columnName + ' = :value';
            rawValue = {
                value: filters.value,
            };
        }

        if (filters.ruleSelect != RuleFilter.All) {
            modifiedRuleList.push(
                alias + '.' + RuleFilter[filters.ruleSelect],
            );
        }

        if (filters.orderBy != null) {
            filters.orderBy = alias + '.' + filters.orderBy;
        }

        return {
            skip: skip,
            limit: filters.limit,
            selectForRule: modifiedRuleList,
            value: rawValue,
            column: columnName,
            orderBy: filters.orderBy,
            orderDirection: filters.orderDirection,
            many: filters.many,
        }
    }
}
