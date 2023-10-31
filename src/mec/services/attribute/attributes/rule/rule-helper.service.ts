import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RuleFilterRequestDto } from '@src/mec/dto/query/attribute/attributes/rule-filter.dto';
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
import { DataHelperService } from '../../../../../utils/data-help.service';
import { RuleQueryService } from './rule-query.service';

export const alias = 'rule';
export const indexKey = 'ik_attribute_rule_index';

@Injectable()
export class RuleHelperService extends RuleQueryService {
    constructor(
        @InjectEntityManager()
        private readonly ruleEntityManager: EntityManager,
        private readonly ruleDataHelper: DataHelperService,
    ) {
        super(ruleEntityManager, ruleDataHelper);
    }

    prepareRule({
        createRule,
    }: {
        createRule: CreateRuleDto;
    }): PrepareRuleResponseI {
        try {
            const res: CreateRuleI = this.ruleEntityManager.create(
                Rule,
                createRule,
            );

            if (res != null) {
                return {
                    status: '200',
                    message: null,
                    result: this.ruleEntityManager.create(Rule, createRule),
                };
            }

            return {
                status: '555',
                message: 'Something Went Wrong',
                error: {
                    in: 'Rule Helper -> prepareRule',
                    message:
                        'ruleEntityManager.create(Rule, createRule) => null',
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

    singleRule({ response }: { response: RuleResponseI }): GetRuleI {
        return super.toSingleRuleObject({ response });
    }

    async ruleQuery({
        filters,
    }: {
        filters: RuleFilterRequestDto;
    }): Promise<RuleResponseI> {
        const ruleQuery = this.prepareQueryFilter({ filters, alias });
        if (ruleQuery.message === null) {
            try {
                ruleQuery.query.cache(true);
                ruleQuery.query.useIndex(indexKey);

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
                        message: 'Success',
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

        return {
            status: '666',
            message: 'Ups, Error',
            error: {
                message: ruleQuery.message,
                in: 'Rule Helper -> ruleQuery',
            },
        };
    }
}
