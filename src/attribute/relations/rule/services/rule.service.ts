import { Injectable } from '@nestjs/common';
import { UpdateRuleDto } from '../dto/update-rule.dto';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { Rule } from '../entities/rule.entity';
import { OrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { RuleFindByType } from '../dto/rule-base.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RuleHelperService } from '@src/base/services/helper/attributes/rule-helper.service';
import { OrderType } from '@src/base/enum/query/query.enum';
import { RuleResponseI } from '../interface/rule.interface';

@Injectable()
export class ruleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly ruleHelper: RuleHelperService, // private readonly queryService: QueryService,
    ) {}

    async create({
        CreateRuleDto,
    }: {
        CreateRuleDto: CreateRuleDto;
    }): Promise<RuleResponseI> {
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    Rule,
                    await this.prepareRule({ CreateRuleDto: CreateRuleDto }),
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

    protected async prepareRule({
        CreateRuleDto,
    }: {
        CreateRuleDto: CreateRuleDto;
    }): Promise<CreateRuleDto> {
        return this.entityManager.create(Rule, CreateRuleDto);
    }
}
