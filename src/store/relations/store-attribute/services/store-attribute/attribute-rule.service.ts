import { Injectable } from '@nestjs/common';
import { StoreViewOrderedPaginationDto } from '@src/base/dto/filter/filters.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { OrderType } from '@src/base/enum/query/query.enum';
import {
    CreateStoreRuleI,
    StoreRuleResponseI,
} from '../../interface/store-attributes/attributes-rule.interface';
import { StoreViewRule } from '../../entities/store-attribute/attribute-rule.entity';
import { StoreRuleFindByType } from '@src/attribute/relations/rule/dto/rule-base.dto';
import { UpdateStoreRuleDto } from '../../dto/store-attribute/rule/update-attribute-rule.dto';
import { StoreRuleHelperService } from '@src/base/services/helper/store/store-attributes/attributes-rule-helper.service';
import { CreateStoreRuleDto } from '../../dto/store-attribute/rule/create-attribute-rule.dto';

@Injectable()
export class StoreViewRuleService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly ruleHelper: StoreRuleHelperService, // private readonly queryService: QueryService,
    ) {}

    async create({
        createRuleDto,
    }: {
        createRuleDto: CreateStoreRuleDto;
    }): Promise<StoreRuleResponseI> {
        try {
            return {
                status: '200',
                message: 'Success',
                result: await this.entityManager.save(
                    StoreViewRule,
                    await this.prepareRule({ rule: createRuleDto }),
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

    async findOneById({ id }: { id: number }): Promise<StoreRuleResponseI> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                storeViewId: null,
                page: 1,
                limit: 0,
                orderBy: null,
                orderDirection: OrderType.NO,
                columnName: 'id',
                value: id,
                select: null,
                many: false,
            },
        });
    }

    async findOneByStoreViewAndAttribute({
        relatedAttribute,
        storeView,
    }: {
        relatedAttribute: number;
        storeView: number;
    }): Promise<StoreRuleResponseI> {
        return await this.ruleHelper.findByStoreViewAndAttribute({
            storeAttribute: relatedAttribute,
            storeViewId: storeView,
        });
    }

    async findThisRuleType({
        id,
        type,
    }: {
        id: number;
        type: StoreRuleFindByType;
    }): Promise<StoreRuleResponseI> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                storeViewId: type.storeView,
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
        condition: StoreViewOrderedPaginationDto;
    }): Promise<StoreRuleResponseI> {
        return await this.ruleHelper.singleConditionRuleQuery({
            filters: {
                storeViewId: condition.storeViewId,
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
        rule: UpdateStoreRuleDto;
    }): Promise<StoreRuleResponseI> {
        return (await this.entityManager.update(StoreViewRule, id, rule)).raw;
    }

    async remove({ id }: { id: number }): Promise<StoreRuleResponseI> {
        try {
            if (
                (await this.entityManager.delete(StoreViewRule, id)).affected >
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

    protected async prepareRule({
        rule,
    }: {
        rule: CreateStoreRuleI;
    }): Promise<CreateStoreRuleI> {
        return this.entityManager.create(StoreViewRule, rule);
    }
}
