import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    AttributeRule,
    RuleAlias,
    RuleIndex,
} from '@src/rule/entities/rule.entity';

import {
    GetRuleI,
    RuleResponseI,
} from '@src/rule/interface/get-rule.interface';
import {
    CreateRuleI,
    PrepareRuleResponseI,
} from '@src/rule/interface/rule.interface';

import { CreateRuleDto } from '@src/rule/dto/create-rule.dto';
import { RuleQueryFilterDto } from '@src/mec/dto/filter/attribute/attributes/rule-filter.dto';

import { DataHelperService } from '@src/mec/utils/data-help.service';
import { RuleQueryService } from './rule-query.service';

@Injectable()
export class RuleHelperService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly queryService: RuleQueryService,
        private readonly ruleDataHelper: DataHelperService,
    ) {}

    prepareRule({
        createRule,
    }: {
        createRule: CreateRuleDto;
    }): PrepareRuleResponseI {
        try {
            const res: CreateRuleI = this.entityManager.create(
                AttributeRule,
                createRule,
            );

            if (res != null) {
                return {
                    status: '200',
                    message: null,
                    result: res,
                };
            }

            return {
                status: '666',
                message: 'Something Went Wrong',
                error: {
                    in: 'Rule Helper -> prepareRule',
                    message: 'prepareRule => null',
                },
            };
        } catch (e) {
            const error = e as Error;
            return {
                status: '666',
                message: null,
                error: {
                    in: 'Rule Helper -> prepareRule',
                    message: error.message,
                },
            };
        }
    }

    singleRule({ response }: { response: RuleResponseI }): GetRuleI {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.ruleDataHelper.toSingleObject({ response });
    }

    async ruleQuery({
        filters,
    }: {
        filters: RuleQueryFilterDto;
    }): Promise<RuleResponseI> {
        const ruleQuery = this.queryService.prepareQueryFilter({
            filters,
            alias: RuleAlias,
        });
        if (ruleQuery.message === null) {
            try {
                ruleQuery.query.cache(true);
                ruleQuery.query.useIndex(RuleIndex);

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
                const error = e as Error;
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        in: 'ruleQuery',
                        message: error.message,
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
