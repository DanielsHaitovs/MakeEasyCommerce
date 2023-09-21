import { Injectable } from '@nestjs/common';
import {
    CreateAttributeDto,
    CreateAttributeShortDto,
} from '../dto/create-attribute.dto';
import { UpdateAttributeShortDto } from '../dto/update-attribute.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
    AttributeResponseInterface,
    AttributeRuleInterface,
    GetAttributeInterface,
} from '../interfaces/attribute.interface';
import { OptionService } from '../relations/option/services/option.service';
import { GetAttributeDto } from '../dto/get-attribute.dto';
import { AttributeHelperService } from '@src/base/services/helper/attributes/attribute-helper.service';
import {
    AttributerRelations,
    OrderedPaginationDto,
} from '@src/base/dto/filter/filters.dto';
import { Attributes } from '../entities/attributes.entity';
import { OrderType } from '@src/base/enum/query/query.enum';
import { UpdateRulesDto } from '../relations/rule/dto/update-rule.dto';
import { GetRulesDto } from '../relations/rule/dto/get-rule.dto';
import { Rule } from '../relations/rule/entities/rule.entity';

// There is option to load data about table columns from database
export const AttributeDescriptionList = {
    all: [
        'id',
        'description.name',
        'description.code',
        'description.isActive',
        'description.isRequired',
    ],
    id: ['id'],
};
@Injectable()
export class AttributeService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly optionService: OptionService,
        private readonly attributeHelper: AttributeHelperService,
    ) {}

    async create({
        createAttribute,
    }: {
        createAttribute: CreateAttributeDto;
    }): Promise<AttributeResponseInterface> {
        const check = await this.ifExists({
            name: createAttribute.description.name,
            code: createAttribute.description.code,
        });
        if (check) {
            return {
                status: 999,
                error: {
                    message: 'Attribute already exists',
                    in: 'Attribute Entity',
                },
            };
        }
        try {
            const newAttribute: GetAttributeDto = await this.entityManager.save(
                Attributes,
                this.entityManager.create(Attributes, createAttribute),
            );
            const savedOptions = await this.optionService.createMany({
                createOptions: {
                    relatedAttribute: newAttribute.id,
                    options: createAttribute.options,
                },
            });
            if (!Array.isArray(savedOptions.result)) {
                return {
                    error: {
                        message: 'Saved options is not an array',
                        in: 'Attribute Option Entity',
                    },
                };
            }
            newAttribute.optionsIds = savedOptions.result.map(
                (option) => option.id,
            );
            return {
                result: {
                    options: { ...savedOptions.result },
                    ...newAttribute,
                },
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Attribute Entity',
                },
            };
        }
    }

    async createShort({
        createAttribute,
    }: {
        createAttribute: CreateAttributeShortDto;
    }): Promise<AttributeResponseInterface> {
        try {
            const check = await this.ifExists({
                name: createAttribute.description.name,
                code: createAttribute.description.code,
            });

            if (check) {
                return {
                    status: 999,
                    error: {
                        message: 'Attribute already exists',
                        in: 'Attribute Entity',
                    },
                };
            }

            return {
                result: await this.entityManager.save(
                    Attributes,
                    this.entityManager.create(Attributes, createAttribute),
                ),
            };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    in: 'Attribute Entity',
                },
            };
        }
    }

    async findAll({
        condition,
    }: {
        condition: OrderedPaginationDto;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: condition.page,
                limit: condition.limit,
                orderBy: condition.orderBy,
                orderDirection: condition.orderDirection,
                columnName: null,
                value: null,
                select: null,
                joinOptions: false,
                joinRules: false,
            },
        });
    }

    async findOneById({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
                joinOptions: false,
                joinRules: false,
            },
        });
    }

    async findOneWithRelationById({
        id,
        relations,
    }: {
        id: number;
        relations: AttributerRelations;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: null,
                joinOptions: relations.joinOptions,
                joinRules: relations.joinRules,
            },
        });
    }

    async findAttributeRule({
        id,
    }: {
        id: number;
    }): Promise<AttributeResponseInterface> {
        return await this.attributeHelper.singleConditionAttributeQuery({
            filters: {
                page: 1,
                limit: 1,
                orderBy: null,
                orderDirection: OrderType.ASC,
                columnName: 'id',
                value: id,
                select: ['id', 'rules'],
                joinOptions: false,
                joinRules: true,
            },
        });
    }

    async update({
        id,
        attribute,
    }: {
        id: number;
        attribute: UpdateAttributeShortDto;
    }): Promise<AttributeResponseInterface> {
        const test = this.entityManager.create(Attributes, {
            description: {
                ...attribute,
            },
        });
        console.log(test);
        return (
            await this.entityManager.update(
                Attributes,
                id,
                this.entityManager.create(Attributes, {
                    description: {
                        ...attribute,
                    },
                }),
            )
        ).raw;
    }

    async updateRules({
        attributeId,
        rules,
    }: {
        attributeId: number;
        rules: UpdateRulesDto;
    }): Promise<AttributeResponseInterface> {
        const updateRule: AttributeResponseInterface =
            await this.attributeHelper.singleConditionAttributeQuery({
                filters: {
                    page: 1,
                    limit: 1,
                    orderBy: null,
                    orderDirection: OrderType.ASC,
                    columnName: 'id',
                    value: attributeId,
                    select: ['id', 'rules.id'],
                    joinOptions: false,
                    joinRules: true,
                },
            });

        const prepared: AttributeRuleInterface = updateRule.result[0];
        console.log(prepared);
        const affected = (
            await this.entityManager.update(Rule, prepared.rules.id, rules)
        ).affected;
        console.log(affected);
        if (affected > 0) {
            return {
                status: 200,
                message: 'Attribute Rules Successfully updated',
                result: {
                    id: prepared.id,
                    description: null,
                    options: null,
                    rules: prepared.rules,
                    optionsIds: prepared.optionsIds,
                },
            };
        } else {
            return {
                error: {
                    message: 'Failed to update Attribute Rules',
                    in: 'Attribute Entity',
                },
            };
        }
    }

    remove(id: number) {
        return `This action removes a #${id} attribute`;
    }

    protected async ifExists({
        name,
        code,
    }: {
        name: string;
        code: string;
    }): Promise<boolean> {
        const attribute = await this.entityManager
            .getRepository(Attributes)
            .createQueryBuilder('attributes')
            .where('attributes.description.name = :name', { name })
            .orWhere('attributes.description.code = :code', { code })
            .getExists();
        if (attribute && attribute != null) {
            return true;
        }
        return false;
    }
}
