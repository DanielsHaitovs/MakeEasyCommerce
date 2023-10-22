import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    RuleFilterRequestDto,
    RuleQueryFilterDto,
} from '@src/mec/dto/query/attribute/attributes/rule-filter.dto';
import { OrderDirection } from '@src/mec/enum/query/query.enum';
import {
    RuleQueryFilterI,
    RuleSelectI,
} from '@src/mec/interface/attribute/attributes/rule-base.interface';
import { CreateRuleDto } from '@src/rule/dto/create-rule.dto';
import { Rule } from '@src/rule/entities/rule.entity';
import {
    GetRuleI,
    RuleResponseI,
} from '@src/rule/interface/get-rule.interface';
import {
    CreateRuleI,
    PrepareRuleResponseI,
} from '@src/rule/interface/rule.interface';
import { EntityManager } from 'typeorm';
import { QueryFilterService } from '../../query/query-filter.service';
import { QueryHelperService } from '../../query/helper/query-help.service';

export const alias = 'rule';
export const indexKey = 'ik_attribute_rule_index';

@Injectable()
export class RuleHelperService extends QueryFilterService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryHelper: QueryHelperService,
    ) {
        super();
    }

    prepareRule({
        createRule,
    }: {
        createRule: CreateRuleDto;
    }): PrepareRuleResponseI {
        try {
            const res: CreateRuleI = this.entityManager.create(
                Rule,
                createRule,
            );

            if (res != null) {
                return {
                    status: '200',
                    message: null,
                    result: this.entityManager.create(Rule, createRule),
                };
            }

            return {
                status: '555',
                message: 'Something Went Wrong',
                error: {
                    in: 'Rule Helper -> prepareRule',
                    message: 'entityManager.create(Rule, createRule) => null',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: null,
                error: {
                    in: 'Rule Helper -> prepareRule',
                    message: e.message,
                },
            };
        }
    }

    async ruleQuery({
        filters,
    }: {
        filters: RuleFilterRequestDto;
    }): Promise<RuleResponseI> {
        const ruleQuery = this.prepareQueryFilter({ filters, alias });

        if (ruleQuery.message === null) {
            try {
                if (ruleQuery.many) {
                    const rules: GetRuleI[] = await Promise.resolve(
                        ruleQuery.query.getMany(),
                    );

                    if (rules != null && rules.length > 0) {
                        return {
                            status: '200',
                            message: 'test',
                            result: rules,
                        };
                    }

                    return {
                        status: '404',
                        message: 'Ups, Error',
                        error: {
                            in: 'ruleQuery',
                            message: 'Not found',
                        },
                    };
                }

                const rule: GetRuleI = await Promise.resolve(
                    ruleQuery.query.getOne(),
                );

                if (rule != null && rule.id != undefined) {
                    return {
                        status: '200',
                        message: 'test',
                        result: rule,
                    };
                }

                return {
                    status: '404',
                    message: 'Ups, Error',
                    error: {
                        in: 'ruleQuery',
                        message: 'Not found',
                    },
                };
            } catch (e) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        in: 'ruleQuery',
                        message: e.message,
                    },
                };
            }
        }
    }

    protected prepareQueryFilter({
        filters,
        alias,
    }: {
        filters: RuleFilterRequestDto;
        alias: string;
    }): RuleQueryFilterI {
        const queryFilter = super.prepareQueryFilter({ filters, alias });

        try {
            const onlyActive: boolean = this.queryHelper.valueToBoolean(
                filters.valueSettings,
            );
            const ruleQuery = this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias);

            if (filters.valueIds != null) {
                if (filters.valueIds.length === 1) {
                    ruleQuery.where(alias + '.id = :id', {
                        id: filters.valueIds,
                    });
                } else {
                    ruleQuery.where(alias + '.id IN (:...ids)', {
                        ids: filters.valueIds,
                    });
                }
            }

            if (filters.select != null && filters.select.length != 0) {
                if (!Array.isArray(filters.select)) {
                    ruleQuery.select([filters.select]);
                } else {
                    ruleQuery.select(filters.select);
                }
            }

            if (onlyActive != null && Array.isArray(filters.select)) {
                for (const select of filters.select) {
                    if (select != alias + '.id') {
                        ruleQuery.orHaving(select + ' = :value', {
                            value: onlyActive,
                        });
                        ruleQuery.groupBy('rule.id');
                    }
                }
            }

            if (queryFilter.order.by != null) {
                ruleQuery.orderBy(
                    queryFilter.order.by,
                    queryFilter.order.direction,
                );
            }

            ruleQuery.skip(queryFilter.pagination.page);
            ruleQuery.limit(queryFilter.pagination.limit);

            return {
                message: null,
                many: null,
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

    protected getDefaultRule(): CreateRuleI {
        return {
            front: {
                useInCatalog: false,
                useInListing: false,
                useInLayeredNavigation: false,
                useInFilter: false,
                useInOptionFilter: false,
                useInSort: false,
                useInSearch: false,
                useInPromo: false,
                useInReport: false,
            },
            back: {
                useInCatalog: false,
                useInListing: false,
                useInLayeredNavigation: false,
                useInFilter: false,
                useInOptionFilter: false,
                useInSort: false,
                useInSearch: false,
                useInPromo: false,
                useInReport: false,
            },
        };
    }

    protected getDefaultRuleSelect(): RuleSelectI {
        return {
            all: false,
            id: true,
            front: {
                useInCatalog: false,
                useInListing: false,
                useInLayeredNavigation: false,
                useInFilter: false,
                useInOptionFilter: false,
                useInSort: false,
                useInSearch: false,
                useInPromo: false,
                useInReport: false,
            },
            back: {
                useInCatalog: false,
                useInListing: false,
                useInLayeredNavigation: false,
                useInFilter: false,
                useInOptionFilter: false,
                useInSort: false,
                useInSearch: false,
                useInPromo: false,
                useInReport: false,
            },
        };
    }

    protected toSingleRuleObject({
        response,
    }: {
        response: RuleResponseI;
    }): GetRuleI {
        return this.queryHelper.toSingleObject({ response });
    }

    private async oneRuleQuery({
        selectList,
        columnName,
        rawValue,
    }: {
        selectList: string[];
        columnName: string;
        rawValue: {
            value: number;
        };
    }): Promise<RuleResponseI> {
        try {
            const result: GetRuleI = await this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
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
                    in: 'Rule Helper -> oneRuleQuery',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper -> oneRuleQuery',
                },
            };
        }
    }

    private async manyRuleQuery({
        page,
        limit,
        selectList,
        columnName,
        rawValue,
    }: {
        page: number;
        limit: number;
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
    }): Promise<RuleResponseI> {
        try {
            const result: GetRuleI[] = await this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .skip(page)
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
                    in: 'Rule Helper -> manyRuleQuery',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper -> manyRuleQuery',
                },
            };
        }
    }

    private async manyOrderedRuleQuery({
        page,
        limit,
        selectList,
        columnName,
        rawValue,
        orderBy,
        orderDirection,
    }: {
        page: number;
        limit: number;
        selectList: string[];
        columnName: string;
        rawValue: {
            value: string | number | boolean | Date | JSON;
        };
        orderBy: string;
        orderDirection: OrderDirection;
    }): Promise<RuleResponseI> {
        try {
            const result: GetRuleI[] = await this.entityManager
                .getRepository(Rule)
                .createQueryBuilder(alias)
                .where(columnName, rawValue)
                .select(selectList)
                .orderBy(orderBy, orderDirection)
                .skip(page)
                .take(limit)
                .cache(true)
                .useIndex(indexKey)
                .getMany();

            if (result != null && result.length > 0) {
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
                    in: 'Rule Helper -> manyOrderedRuleQuery',
                },
            };
        } catch (e) {
            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    message: e.message,
                    in: 'Rule Helper -> manyOrderedRuleQuery',
                },
            };
        }
    }
}
