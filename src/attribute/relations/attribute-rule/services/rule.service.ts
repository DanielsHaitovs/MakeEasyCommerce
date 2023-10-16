import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { OrderType } from '@src/base/enum/query/query.enum';
import { AttributeRule } from '../entities/rule.entity';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { RuleFindByType } from '@src/base/dto/mec/attribute/attributes/rule.dto';
import { RuleHelperService } from '@src/base/services/attribute/attributes/rule-helper.service';
import { RuleResponseI } from '../interface/rule.interface';

@Injectable()
export class RuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly ruleHelper: RuleHelperService,
    ) {}

    async create({
        createRuleDto,
    }: {
        createRuleDto: CreateRuleDto;
    }): Promise<RuleResponseI> {
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    AttributeRule,
                    this.ruleHelper.prepareRule({
                        createRuleDto: createRuleDto,
                    }),
                ),
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

    async findOneById({ id }: { id: number }): Promise<RuleResponseI> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                page: 1,
                limit: 0,
                orderBy: 'id',
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
                many: false,
            },
        });
    }

    async findThisRuleType({
        id,
        type,
    }: {
        id: number;
        type: RuleFindByType;
    }): Promise<RuleResponseI> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: [type.ruleType],
                many: false,
            },
        });
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<RuleResponseI> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: null,
                value: null,
                select: null,
                many: true,
            },
        });
    }

    async update({
        id,
        rule,
    }: {
        id: number;
        rule: UpdateRuleDto;
    }): Promise<RuleResponseI> {
        return (await this.entityManager.update(AttributeRule, id, rule)).raw;
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
