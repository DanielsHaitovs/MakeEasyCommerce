import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { GetRuleI, RuleResponseI } from '../interface/get-rule.interface';
import { AttributeRule } from '../entities/rule.entity';
import { RuleHelperService } from '@src/rule/service/query/rule-helper.service';
import { RuleQueryFilterDto } from '@src/mec/dto/filter/attribute/attributes/rule-filter.dto';

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

    findAll() {
        return `This action returns all attributeRule`;
    }

    findOne(id: number) {
        return `This action returns a #${id} attributeRule`;
    }

    update(id: number, updateAttributeRuleDto: UpdateRuleDto) {
        console.log(updateAttributeRuleDto);
        return `This action updates a #${id} attributeRule`;
    }

    remove(id: number) {
        return `This action removes a #${id} attributeRule`;
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
