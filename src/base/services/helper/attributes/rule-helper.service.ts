import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Rule } from '@src/attribute/relations/rule/entities/rule.entity';
import { RuleResponseInterface } from '@src/attribute/relations/rule/interface/rule.interface';
import { SingleConditionDto } from '@src/base/dto/filter/filters.dto';
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
        const rulesList: string[] = [];
        let whereCondition = '';
        let select = false;
        let where = false;
        let order = false;
        if (filters.select.shift() && filters.select.shift() != null) {
            for (const rule of RuleList) {
                rulesList.push(
                    alias + '.' + filters.select.shift() + '.' + rule,
                );
            }
            select = true;
        }
        if (alias == 'rule' && filters.columnName.length != 0) {
            whereCondition = alias + '.' + filters.columnName + ' = :value';
            where = true;
        }
        if (filters.orderBy != null) {
            order = true;
        }

        if (where && whereCondition != '') {
            if (select) {
                if (order) {
                    return {
                        result: await this.entityManager
                            .getRepository(Rule)
                            .createQueryBuilder(alias)
                            .where(whereCondition, {
                                value: filters.value,
                            })
                            .select(rulesList)
                            .orderBy(filters.orderBy, filters.orderDirection)
                            .skip(skip)
                            .take(filters.limit)
                            .getMany(),
                    };
                }
                return {
                    result: await this.entityManager
                        .getRepository(Rule)
                        .createQueryBuilder(alias)
                        .where(whereCondition, {
                            value: filters.value,
                        })
                        .select(rulesList)
                        .skip(skip)
                        .take(filters.limit)
                        .getMany(),
                };
            }

            if (order) {
                return {
                    result: await this.entityManager
                        .getRepository(Rule)
                        .createQueryBuilder(alias)
                        .where(whereCondition, {
                            value: filters.value,
                        })
                        .orderBy(filters.orderBy, filters.orderDirection)
                        .skip(skip)
                        .take(filters.limit)
                        .getMany(),
                };
            }
            return {
                result: await this.entityManager
                    .getRepository(Rule)
                    .createQueryBuilder(alias)
                    .where(whereCondition, {
                        value: filters.value,
                    })
                    .skip(skip)
                    .take(filters.limit)
                    .getMany(),
            };
        }

        if (select) {
            if (order) {
                return {
                    result: await this.entityManager
                        .getRepository(Rule)
                        .createQueryBuilder(alias)
                        .select(rulesList)
                        .orderBy(filters.orderBy, filters.orderDirection)
                        .skip(skip)
                        .take(filters.limit)
                        .getMany(),
                };
            }
            return {
                result: await this.entityManager
                    .getRepository(Rule)
                    .createQueryBuilder(alias)
                    .select(rulesList)
                    .skip(skip)
                    .take(filters.limit)
                    .getMany(),
            };
        }

        if (order) {
            return {
                result: await this.entityManager
                    .getRepository(Rule)
                    .createQueryBuilder(alias)
                    .orderBy(filters.orderBy, filters.orderDirection)
                    .skip(skip)
                    .take(filters.limit)
                    .getMany(),
            };
        }
        return {
            result: await this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias)
                .skip(skip)
                .take(filters.limit)
                .getMany(),
        };
    }
}
