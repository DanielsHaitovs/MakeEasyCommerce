import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto, UpdateRuleTypeDto } from '../dto/update-rule.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetRuleI, RuleResponseI } from '../interface/get-rule.interface';
import { AttributeRule } from '../entities/rule.entity';
import { RuleQueryFilterDto } from '@src/rule/dto/filter/rule-filter.dto';
import { RuleType } from '@src/rule/enum/rule.enum';
import { RuleHelperService } from '@src/rule/service/helper/rule-helper.service';

@Injectable()
export class AttributeRuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly ruleHelper: RuleHelperService,
    ) {}

    async create({
        createAttributeRule,
    }: {
        createAttributeRule: CreateRuleDto;
    }): Promise<RuleResponseI> {
        const prepareRule = this.ruleHelper.prepareRule({
            createRule: createAttributeRule,
        });
        if (prepareRule.result != undefined) {
            try {
                const res: GetRuleI = await this.entityManager.save(
                    AttributeRule,
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
                const error = e as Error;
                return this.handleError({
                    e: error,
                    where: 'Create',
                });
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
        ruleQuery: RuleQueryFilterDto;
    }): Promise<RuleResponseI> {
        return await this.ruleHelper.ruleQuery({
            filters: { ...ruleQuery },
        });
    }

    async update({
        id,
        rule,
    }: {
        id: number;
        rule: UpdateRuleDto;
    }): Promise<RuleResponseI> {
        try {
            const affected: number = (
                await this.entityManager.update(AttributeRule, id, rule)
            ).affected;

            if (affected > 0) {
                return {
                    status: '200',
                    message: 'Success',
                };
            }

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    in: 'Rule Service Update',
                    message: 'Could not update rule',
                },
            };
        } catch (e) {
            const error = e as Error;
            return this.handleError({
                e: error,
                where: 'Update',
            });
        }
    }

    async updateType({
        id,
        rule,
        type,
    }: {
        id: number;
        rule: UpdateRuleTypeDto;
        type: RuleType;
    }): Promise<RuleResponseI> {
        try {
            const affected: number = (
                await this.entityManager.update(AttributeRule, id, {
                    [type]: rule,
                })
            ).affected;

            if (affected > 0) {
                return {
                    status: '200',
                    message: 'Success',
                };
            }

            return {
                status: '666',
                message: 'Ups, Error',
                error: {
                    in: 'Rule Service Update',
                    message: 'Could not update rule',
                },
            };
        } catch (e) {
            const error = e as Error;
            return this.handleError({
                e: error,
                where: 'Update',
            });
        }
    }

    async remove({ id }: { id: number }): Promise<RuleResponseI> {
        try {
            if (
                (await this.entityManager.delete(AttributeRule, id)).affected >
                0
            ) {
                return {
                    status: '200',
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            const error = e as Error;
            return this.handleError({
                e: error,
                where: 'Remove',
            });
        }
    }

    private handleError({
        e,
        where,
    }: {
        e: Error;
        where: string;
    }): RuleResponseI {
        if (e.message != undefined) {
            return {
                status: '666',
                message: 'Rule Service -> ' + where,
                error: {
                    message: e.message,
                    in: 'Rule Entity',
                },
            };
        }
    }
}
