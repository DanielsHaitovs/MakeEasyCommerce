import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { Rule } from '../entities/rule.entity';

import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';

import { RuleHelperService } from '@src/mec/services/attribute/attributes/rule-helper.service';
import { GetRuleI, RuleResponseI } from '../interface/get-rule.interface';
import { RuleFilterRequestDto } from '@src/mec/dto/query/attribute/attributes/rule-filter.dto';

@Injectable()
export class RuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly ruleHelper: RuleHelperService,
    ) {}

    async create({
        createRule,
    }: {
        createRule: CreateRuleDto;
    }): Promise<RuleResponseI> {
        const prepareRule = this.ruleHelper.prepareRule({ createRule });
        if (prepareRule.result != undefined) {
            try {
                const res: GetRuleI = await this.entityManager.save(
                    Rule,
                    prepareRule.result,
                );

                if (res != null) {
                    return {
                        status: '200',
                        message: 'Success',
                        result: res,
                    };
                }
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: 'Something Went wrong saving the rule',
                        in: 'Rule Service this.entityManager.save',
                    },
                };
            } catch (e) {
                return {
                    status: '666',
                    message: 'Ups, Error',
                    error: {
                        message: e.message,
                        in: 'Rule Entity',
                    },
                };
            }
        }

        return {
            status: prepareRule.status,
            message: prepareRule.message,
            error: prepareRule.error,
        };
    }

    async findRuleQuery({
        ruleQuery,
    }: {
        ruleQuery: RuleFilterRequestDto;
    }): Promise<RuleResponseI> {
        return await this.ruleHelper.ruleQuery({
            filters: { ...ruleQuery },
        });
    }

    //   async findOneById({ id }: { id: number }): Promise<RuleResponseI> {
    //     return await this.ruleHelper.ruleQueryFilter({
    //         filters: {
    //             page: 1,
    //             limit: 0,
    //             orderBy: 'id',
    //             orderDirection: OrderDirection.ASC,
    //             columnName: 'id',
    //             value: id,
    //             many: false,
    //             ruleSelect: [RuleSelect.All],
    //         },
    //     });
    // }

    async update({
        id,
        rule,
    }: {
        id: number;
        rule: UpdateRuleDto;
    }): Promise<RuleResponseI> {
        return (await this.entityManager.update(Rule, id, rule)).raw;
    }

    async remove({ id }: { id: number }): Promise<RuleResponseI> {
        try {
            if ((await this.entityManager.delete(Rule, id)).affected > 0) {
                return {
                    status: '200',
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return {
                status: '666',
                message: 'Something went wrong during remove of this entity',
                error: {
                    message: e.message,
                    in: 'Rule Entity',
                },
            };
        }
    }
}
