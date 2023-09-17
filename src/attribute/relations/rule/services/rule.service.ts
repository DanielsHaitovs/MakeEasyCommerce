import { Injectable } from '@nestjs/common';
import { UpdateRulesDto } from '../dto/update-rule.dto';
import { CreateRulesDto } from '../dto/create-rule.dto';
import { QueryService } from '@src/base/services/query/query.service';
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
        private readonly ruleHelper: RuleHelperService,
        private readonly queryService: QueryService,
    ) {}

    async create({
        createRulesDto,
    }: {
        createRulesDto: CreateRulesDto;
    }): Promise<RuleResponseInterface> {
        try {
            return {
                result: await this.entityManager.save(
                    Rule,
                    await this.prepareRule({ createRuleDto: createRulesDto }),
                ),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Rule Entity',
                },
            };
        }
    }

    async findOneById({ id }: { id: number }): Promise<RuleResponseInterface> {
        return await this.ruleHelper.singleConditionRuleQuery({
            alias: 'rule',
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
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
            alias: 'rule',
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
            alias: 'rule',
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
                    message: `Record with id ${id} was removed`,
                };
            }
        } catch (e) {
            return {
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

    protected async createQuery({
        createRulesDto,
    }: {
        createRulesDto: CreateRulesDto;
    }): Promise<RuleResponseInterface> {
        try {
            return {
                result: plainToClass(
                    GetRulesDto,
                    await this.queryService.createEntityQuery({
                        target: Rule,
                        dto: createRulesDto,
                        dtoClass: CreateRulesDto,
                        getDto: GetRulesDto,
                    }),
                ),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Rule Entity',
                },
            };
        }
    }

    protected async findOneByIdQuery({
        condition,
    }: {
        condition: FilterDto;
    }): Promise<RuleResponseInterface> {
        return {
            result: plainToClass(
                GetRulesDto,
                await this.queryService.findEntityByQuery({
                    entity: Rule,
                    getDto: GetRulesDto,
                    dtoClass: GetRulesDto,
                    filters: {
                        orderBy: '',
                        orderDirection: OrderType.ASC,
                        select: null,
                        ...condition,
                    },
                }),
            ),
        };
    }

    protected async findThisRuleTypeQuery({
        id,
        type,
    }: {
        id: number;
        type: RuleFindByType;
    }): Promise<RuleResponseInterface> {
        return {
            result: plainToClass(
                GetRulesDto,
                await this.queryService.findEntityByAndSelectQuery({
                    entity: Rule,
                    getDto: GetRulesDto,
                    dtoClass: GetRulesDto,
                    filters: {
                        page: 1,
                        limit: 0,
                        orderBy: 'id',
                        orderDirection: OrderType.ASC,
                        columnName: 'id',
                        value: id,
                        select: [type.ruleType.toLowerCase()],
                    },
                }),
            ),
        };
    }

    protected async findAllQuery({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<any[] | RuleResponseDto> {
        return await this.queryService.findAllEntityQuery({
            entity: Rule,
            getDto: GetRulesDto,
            dtoClass: GetRulesDto,
            filters: {
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: '',
                value: '',
                select: null,
            },
        });
    }
}
