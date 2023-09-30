import { Injectable } from '@nestjs/common';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import { CreateRulesDto } from '../dto/create-rule.dto';
// import { QueryService } from '@src/base/services/query/query.service';
import { Rule } from '../entities/rule.entity';
import {
    FilterDto,
    OrderedPaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { GetRulesDto } from '../dto/get-rule.dto';
import { RuleFindByType, RuleResponseDto } from '../dto/rule-base.dto';
import { plainToClass } from 'class-transformer';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RuleHelperService } from '@src/base/services/helper/attributes/rule-helper.service';
import { OrderType } from '@src/base/enum/query/query.enum';
import { RuleResponseInterface } from '../interface/rule.interface';

@Injectable()
export class RuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly ruleHelper: RuleHelperService, // private readonly queryService: QueryService,
    ) {}

    async create({
        createRulesDto,
    }: {
        createRulesDto: CreateRulesDto;
    }): Promise<RuleResponseInterface> {
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    Rule,
                    await this.prepareRule({ createRuleDto: createRulesDto }),
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

    async findOneById({ id }: { id: number }): Promise<RuleResponseInterface> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                page: 1,
                limit: 0,
                orderBy: 'id',
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
            },
        });
    }

    async findThisRuleType({
        id,
        type,
    }: {
        id: number;
        type: RuleFindByType;
    }): Promise<RuleResponseInterface> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: [type.ruleType],
            },
        });
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<RuleResponseInterface> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: null,
                value: null,
                select: null,
            },
        });
    }

    async update({
        id,
        rules,
    }: {
        id: number;
        rules: UpdateRulesDto;
    }): Promise<RuleResponseInterface> {
        return (await this.entityManager.update(Rule, id, rules)).raw;
    }

    async remove({ id }: { id: number }): Promise<RuleResponseInterface> {
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
        createRuleDto,
    }: {
        createRuleDto: CreateRulesDto;
    }): Promise<CreateRulesDto> {
        return this.entityManager.create(Rule, createRuleDto);
    }
}
